import {
	Component,
	Suspense,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
	type ErrorInfo,
	type ReactNode,
} from 'react';
import {
	Bounds,
	Environment,
	Lightformer,
	OrbitControls,
	useBounds,
	useGLTF,
} from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { MathUtils, PerspectiveCamera, Vector3 } from 'three';
import { IPhoneModel } from './IPhoneModel';
import './iphoneMockup.css';

type Vector3Tuple = [number, number, number];

export type IPhoneMockupProps = {
	screenImage: string;
	modelUrl?: string;
	className?: string;
	alt?: string;
	rotation?: Vector3Tuple;
	scale?: number | Vector3Tuple;
	cameraPosition?: Vector3Tuple;
	enableInteraction?: boolean;
	autoRotate?: boolean;
	fallbackImage?: string;
};

type ErrorBoundaryProps = {
	children: ReactNode;
	fallback: ReactNode;
	onError: (error: Error) => void;
	resetKey: string;
};

type ErrorBoundaryState = {
	error: Error | null;
};

class MockupErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	state: ErrorBoundaryState = { error: null };

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { error };
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		this.props.onError(error);
		if (import.meta.env.DEV) console.error(info.componentStack);
	}

	componentDidUpdate(previousProps: ErrorBoundaryProps) {
		if (
			this.state.error &&
			previousProps.resetKey !== this.props.resetKey
		) {
			this.setState({ error: null });
		}
	}

	render() {
		return this.state.error ? this.props.fallback : this.props.children;
	}
}

function StaticFallback({ src }: { src?: string }) {
	return (
		<div className='iphone-mockup__fallback' aria-hidden='true'>
			{src && <img src={src} alt='' decoding='async' />}
		</div>
	);
}

function useMediaQuery(query: string) {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia(query);
		const update = () => setMatches(mediaQuery.matches);
		update();
		mediaQuery.addEventListener('change', update);
		return () => mediaQuery.removeEventListener('change', update);
	}, [query]);

	return matches;
}

function PhoneCameraFit({
	margin,
	onReady,
}: {
	margin: number;
	onReady: () => void;
}) {
	const bounds = useBounds();
	const camera = useThree(state => state.camera);
	const controls = useThree(state => state.controls);
	const viewportSize = useThree(state => state.size);
	const invalidate = useThree(state => state.invalidate);

	useLayoutEffect(() => {
		if (!(camera instanceof PerspectiveCamera)) return;

		bounds.refresh();
		const { size, center } = bounds.getSize();
		const halfVerticalFov = MathUtils.degToRad(camera.fov / 2);
		const distanceForHeight = size.y / (2 * Math.tan(halfVerticalFov));
		const distanceForWidth =
			size.x / (2 * Math.tan(halfVerticalFov) * camera.aspect);
		const distance =
			Math.max(distanceForHeight, distanceForWidth) * margin + size.z / 2;
		const direction = camera.position.clone().sub(center);

		if (direction.lengthSq() === 0) direction.copy(new Vector3(0, 0, 1));
		direction.normalize();

		camera.position.copy(center).addScaledVector(direction, distance);
		camera.near = Math.max(0.01, distance / 100);
		camera.far = Math.max(100, distance * 100);
		camera.lookAt(center);
		camera.updateProjectionMatrix();
		camera.updateMatrixWorld();

		const orbitControls = controls as
			| { target?: Vector3; update?: () => void }
			| undefined;
		if (orbitControls?.target && orbitControls.update) {
			orbitControls.target.copy(center);
			orbitControls.update();
		}

		invalidate();
		onReady();
	}, [
		bounds,
		camera,
		controls,
		invalidate,
		margin,
		onReady,
		viewportSize.height,
		viewportSize.width,
	]);

	return null;
}

export function IPhoneMockup({
	screenImage,
	modelUrl = '/assets/3d/models/iphone-17-pro-web.glb',
	className = '',
	alt = 'Interactive 3D iPhone mockup',
	rotation = [Math.PI, 0, 0],
	scale = 1,
	cameraPosition = [0, 0, 6],
	enableInteraction = true,
	autoRotate = false,
	fallbackImage,
}: IPhoneMockupProps) {
	const rootRef = useRef<HTMLDivElement>(null);
	const [shouldRender, setShouldRender] = useState(false);
	const [sceneReady, setSceneReady] = useState(false);
	const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
	const finePointer = useMediaQuery('(pointer: fine)');
	const canInteract = enableInteraction && finePointer;
	const shouldAutoRotate = autoRotate && !reducedMotion;
	const resetKey = `${modelUrl}|${screenImage}`;
	const fallback = <StaticFallback src={fallbackImage} />;
	const handleSceneReady = useCallback(() => setSceneReady(true), []);

	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		const load = () => {
			useGLTF.preload(modelUrl);
			setShouldRender(true);
		};

		if (!('IntersectionObserver' in window)) {
			load();
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				load();
				observer.disconnect();
			},
			{ rootMargin: '500px 0px' },
		);

		observer.observe(root);
		return () => observer.disconnect();
	}, [modelUrl]);

	useEffect(() => {
		setSceneReady(false);
	}, [modelUrl]);

	const handleLoadError = (error: Error) => {
		if (!import.meta.env.DEV) return;

		const message = String(error.message || error);
		if (message.includes(screenImage)) {
			console.warn(
				`[IPhoneMockup] The screen texture could not be loaded: ${screenImage}`,
				error,
			);
			return;
		}

		console.warn(
			`[IPhoneMockup] The GLB model could not be loaded: ${modelUrl}`,
			error,
		);
	};

	return (
		<div
			ref={rootRef}
			className={`iphone-mockup ${sceneReady ? 'is-scene-ready' : ''} ${className}`.trim()}
			role='img'
			aria-label={alt}
		>
			{shouldRender ? (
				<>
					{!sceneReady && fallback}
					<MockupErrorBoundary
						fallback={null}
						onError={handleLoadError}
						resetKey={resetKey}
					>
						<Suspense fallback={null}>
						<Canvas
							aria-hidden='true'
							tabIndex={-1}
							camera={{ position: cameraPosition, fov: 34 }}
							dpr={[1, 2]}
							frameloop={shouldAutoRotate ? 'always' : 'demand'}
							gl={{
								alpha: true,
								antialias: true,
								powerPreference: 'high-performance',
							}}
							fallback={null}
						>
							<ambientLight intensity={0.85} />
							<directionalLight position={[4, 5, 6]} intensity={2.2} />
							<directionalLight position={[-4, 1, 3]} intensity={0.7} />
							<Environment resolution={64}>
								<Lightformer
									form='rect'
									intensity={2}
									position={[0, 4, 5]}
									scale={[5, 5, 1]}
								/>
								<Lightformer
									form='rect'
									intensity={1.2}
									position={[-4, 0, 2]}
									rotation={[0, Math.PI / 2, 0]}
									scale={[3, 5, 1]}
								/>
							</Environment>

							<Bounds>
								<IPhoneModel
									modelUrl={modelUrl}
									screenImage={screenImage}
									rotation={rotation}
									scale={scale}
								/>
								<PhoneCameraFit
									margin={1.04}
									onReady={handleSceneReady}
								/>
							</Bounds>

							{(canInteract || shouldAutoRotate) && (
								<OrbitControls
									makeDefault
									enableDamping
									dampingFactor={0.08}
									enablePan={false}
									enableZoom={false}
									enableRotate={canInteract}
									autoRotate={shouldAutoRotate}
									autoRotateSpeed={0.65}
									rotateSpeed={0.35}
									minAzimuthAngle={-0.4}
									maxAzimuthAngle={0.4}
									minPolarAngle={Math.PI / 2 - 0.24}
									maxPolarAngle={Math.PI / 2 + 0.24}
								/>
							)}
						</Canvas>
						</Suspense>
					</MockupErrorBoundary>
				</>
			) : (
				fallback
			)}
		</div>
	);
}
