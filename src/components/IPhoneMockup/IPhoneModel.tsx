import { useLayoutEffect, useMemo } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import {
	ClampToEdgeWrapping,
	Color,
	SRGBColorSpace,
	type Material,
	type Mesh,
	type MeshStandardMaterial,
	type Object3D,
	type Texture,
} from 'three';

type Vector3Tuple = [number, number, number];

type IPhoneModelProps = {
	modelUrl: string;
	screenImage: string;
	rotation: Vector3Tuple;
	scale: number | Vector3Tuple;
};

type PreparedModel = {
	scene: Object3D;
	screenMaterials: Material[];
};

function materialSlots(material: Material | Material[]) {
	return Array.isArray(material) ? material : [material];
}

function prepareModel(sourceScene: Object3D): PreparedModel {
	// useGLTF caches its result. Clone the hierarchy so this instance can safely
	// replace its screen material without mutating the shared source scene.
	const scene = sourceScene.clone(true);
	const meshes: Mesh[] = [];

	scene.traverse(object => {
		if ('isMesh' in object && object.isMesh) meshes.push(object as Mesh);
	});

	const hasNamedScreenMaterial = meshes.some(mesh =>
		materialSlots(mesh.material).some(
			material => material.name === 'Screen_Content',
		),
	);
	const clonedMaterials = new Map<Material, Material>();
	const screenMaterials: Material[] = [];

	meshes.forEach(mesh => {
		const replaceMaterial = (material: Material) => {
			const isScreen =
				material.name === 'Screen_Content' ||
				(!hasNamedScreenMaterial && mesh.name === 'Screen');

			if (!isScreen) return material;

			let clone = clonedMaterials.get(material);
			if (!clone) {
				clone = material.clone();
				clone.name = material.name || 'Screen_Content';
				clonedMaterials.set(material, clone);
				screenMaterials.push(clone);
			}

			return clone;
		};

		mesh.material = Array.isArray(mesh.material)
			? mesh.material.map(replaceMaterial)
			: replaceMaterial(mesh.material);
	});

	if (screenMaterials.length === 0 && import.meta.env.DEV) {
		console.warn(
			'[IPhoneMockup] No material named "Screen_Content" or fallback mesh named "Screen" was found.',
		);
	}

	return { scene, screenMaterials };
}

function configureTexture(texture: Texture) {
	texture.colorSpace = SRGBColorSpace;
	texture.flipY = false;
	texture.wrapS = ClampToEdgeWrapping;
	texture.wrapT = ClampToEdgeWrapping;
	texture.needsUpdate = true;
}

function applyScreenTexture(material: Material, texture: Texture) {
	const screenMaterial = material as MeshStandardMaterial;

	if (!screenMaterial.isMeshStandardMaterial) {
		if (import.meta.env.DEV) {
			console.warn(
				`[IPhoneMockup] Screen material "${material.name}" is not a standard or physical material.`,
			);
		}
		return;
	}

	screenMaterial.map = texture;
	screenMaterial.color = new Color(0xffffff);
	screenMaterial.metalness = 0;
	screenMaterial.roughness = 0.2;
	screenMaterial.emissive = new Color(0xffffff);
	screenMaterial.emissiveMap = texture;
	screenMaterial.emissiveIntensity = 0.15;
	screenMaterial.needsUpdate = true;
}

export function IPhoneModel({
	modelUrl,
	screenImage,
	rotation,
	scale,
}: IPhoneModelProps) {
	const { scene: sourceScene } = useGLTF(modelUrl);
	const sourceTexture = useTexture(screenImage);
	const prepared = useMemo(() => prepareModel(sourceScene), [sourceScene]);
	const screenTexture = useMemo(() => {
		const texture = sourceTexture.clone();
		configureTexture(texture);
		return texture;
	}, [sourceTexture]);

	useLayoutEffect(() => {
		prepared.screenMaterials.forEach(material =>
			applyScreenTexture(material, screenTexture),
		);

		return () => {
			prepared.screenMaterials.forEach(material => {
				const screenMaterial = material as MeshStandardMaterial;
				if (!screenMaterial.isMeshStandardMaterial) return;
				screenMaterial.map = null;
				screenMaterial.emissiveMap = null;
			});
		};
	}, [prepared.screenMaterials, screenTexture]);

	useLayoutEffect(
		() => () => {
			screenTexture.dispose();
			prepared.screenMaterials.forEach(material => material.dispose());
		},
		[prepared.screenMaterials, screenTexture],
	);

	return (
		<primitive
			object={prepared.scene}
			rotation={rotation}
			scale={scale}
		/>
	);
}
