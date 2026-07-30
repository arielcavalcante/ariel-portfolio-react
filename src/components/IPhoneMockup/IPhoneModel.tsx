import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import {
	ClampToEdgeWrapping,
	Color,
	Euler,
	Group,
	MathUtils,
	SRGBColorSpace,
	Vector3,
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
	position: Vector3Tuple;
	rotation: Vector3Tuple;
	scale: number | Vector3Tuple;
	animateRotation: boolean;
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
	// Render the UI through the display's emissive channel so scene lights do
	// not lift its blacks or add a second, washed-out copy of the screenshot.
	screenMaterial.color = new Color(0x000000);
	screenMaterial.metalness = 0;
	screenMaterial.roughness = 0.2;
	screenMaterial.emissive = new Color(0xffffff);
	screenMaterial.emissiveMap = texture;
	screenMaterial.emissiveIntensity = 1;
	screenMaterial.envMapIntensity = 0;
	screenMaterial.toneMapped = false;
	screenMaterial.needsUpdate = true;
}

export function IPhoneModel({
	modelUrl,
	screenImage,
	position,
	rotation,
	scale,
	animateRotation,
}: IPhoneModelProps) {
	const { scene: sourceScene } = useGLTF(modelUrl);
	const sourceTexture = useTexture(screenImage);
	const groupRef = useRef<Group>(null);
	const initialPosition = useRef(position);
	const initialRotation = useRef(rotation);
	const initialScale = useRef(1);
	const invalidate = useThree(state => state.invalidate);
	const prepared = useMemo(() => prepareModel(sourceScene), [sourceScene]);
	const targetPosition = useMemo(
		() => new Vector3(position[0], position[1], position[2]),
		[position[0], position[1], position[2]],
	);
	const targetRotation = useMemo(
		() => new Euler(rotation[0], rotation[1], rotation[2]),
		[rotation[0], rotation[1], rotation[2]],
	);
	const targetScale = useMemo(() => {
		if (typeof scale === 'number') return new Vector3(scale, scale, scale);
		return new Vector3(scale[0], scale[1], scale[2]);
	}, [scale]);
	const screenTexture = useMemo(() => {
		const texture = sourceTexture.clone();
		configureTexture(texture);
		return texture;
	}, [sourceTexture]);

	useEffect(() => {
		invalidate();
	}, [invalidate, targetPosition, targetRotation, targetScale]);

	useFrame((state, delta) => {
		const group = groupRef.current;
		if (!group) return;

		if (!animateRotation) {
			group.position.copy(targetPosition);
			group.rotation.copy(targetRotation);
			group.scale.copy(targetScale);
			return;
		}

		group.position.x = MathUtils.damp(
			group.position.x,
			targetPosition.x,
			7,
			delta,
		);
		group.position.y = MathUtils.damp(
			group.position.y,
			targetPosition.y,
			7,
			delta,
		);
		group.position.z = MathUtils.damp(
			group.position.z,
			targetPosition.z,
			7,
			delta,
		);
		group.rotation.x = MathUtils.damp(
			group.rotation.x,
			targetRotation.x,
			7,
			delta,
		);
		group.rotation.y = MathUtils.damp(
			group.rotation.y,
			targetRotation.y,
			7,
			delta,
		);
		group.rotation.z = MathUtils.damp(
			group.rotation.z,
			targetRotation.z,
			7,
			delta,
		);
		group.scale.x = MathUtils.damp(
			group.scale.x,
			targetScale.x,
			7,
			delta,
		);
		group.scale.y = MathUtils.damp(
			group.scale.y,
			targetScale.y,
			7,
			delta,
		);
		group.scale.z = MathUtils.damp(
			group.scale.z,
			targetScale.z,
			7,
			delta,
		);

		const distance =
			group.position.distanceTo(targetPosition) +
			Math.abs(group.rotation.x - targetRotation.x) +
			Math.abs(group.rotation.y - targetRotation.y) +
			Math.abs(group.rotation.z - targetRotation.z) +
			group.scale.distanceTo(targetScale);

		if (distance > 0.0005) state.invalidate();
	});

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
		<group
			ref={groupRef}
			position={initialPosition.current}
			rotation={initialRotation.current}
			scale={initialScale.current}
		>
			<primitive object={prepared.scene} />
		</group>
	);
}
