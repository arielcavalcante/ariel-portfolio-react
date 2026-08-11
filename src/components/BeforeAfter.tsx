import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type CSSProperties,
	type KeyboardEvent,
	type PointerEvent,
} from 'react';
import './BeforeAfter.css';

type BeforeAfterProps = {
	before: string;
	after: string;
	beforeAlt: string;
	afterAlt: string;
	label: string;
	className?: string;
	aspectRatio?: CSSProperties['aspectRatio'];
};

export function BeforeAfter({
	before,
	after,
	beforeAlt,
	afterAlt,
	label,
	className,
	aspectRatio = 0.479,
}: BeforeAfterProps) {
	const rootRef = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState(50);
	const [dragging, setDragging] = useState(false);
	const frameRef = useRef(0);
	const pendingClientXRef = useRef<number | null>(null);

	const update = useCallback((clientX: number) => {
		pendingClientXRef.current = clientX;
		if (frameRef.current) return;

		frameRef.current = requestAnimationFrame(() => {
			frameRef.current = 0;
			const node = rootRef.current;
			const pendingClientX = pendingClientXRef.current;
			if (!node || pendingClientX === null) return;

			const rect = node.getBoundingClientRect();
			const next = ((pendingClientX - rect.left) / rect.width) * 100;
			setPosition(Math.min(98, Math.max(2, next)));
		});
	}, []);

	useEffect(
		() => () => {
			cancelAnimationFrame(frameRef.current);
		},
		[],
	);

	const pointerDown = (event: PointerEvent<HTMLDivElement>) => {
		setDragging(true);
		event.currentTarget.setPointerCapture(event.pointerId);
		update(event.clientX);
	};

	const pointerMove = (event: PointerEvent<HTMLDivElement>) => {
		if (dragging || event.pointerType === 'mouse') update(event.clientX);
	};

	const pointerUp = () => setDragging(false);
	const keyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		let nextPosition = position;

		switch (event.key) {
			case 'ArrowLeft':
			case 'ArrowDown':
				nextPosition -= 2;
				break;
			case 'ArrowRight':
			case 'ArrowUp':
				nextPosition += 2;
				break;
			case 'Home':
				nextPosition = 2;
				break;
			case 'End':
				nextPosition = 98;
				break;
			default:
				return;
		}

		event.preventDefault();
		setPosition(Math.min(98, Math.max(2, nextPosition)));
	};

	return (
		<div
			ref={rootRef}
			className={`sp-before-after${className ? ` ${className}` : ''}`}
			style={{ aspectRatio }}
			role='slider'
			tabIndex={0}
			aria-label={label}
			aria-valuemin={2}
			aria-valuemax={98}
			aria-valuenow={Math.round(position)}
			aria-valuetext={`${Math.round(position)}%`}
			aria-orientation='horizontal'
			onKeyDown={keyDown}
			onPointerDown={pointerDown}
			onPointerMove={pointerMove}
			onPointerUp={pointerUp}
			onPointerCancel={pointerUp}
			onPointerLeave={() => setDragging(false)}
		>
			<img
				src={before}
				alt={beforeAlt}
				draggable={false}
				loading='lazy'
				decoding='async'
			/>
			<div
				className='sp-before-after__top'
				style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
			>
				<img
					src={after}
					alt={afterAlt}
					draggable={false}
					loading='lazy'
					decoding='async'
				/>
			</div>
			<span className='sp-before-after__line' style={{ left: `${position}%` }}>
				<span className='sp-before-after__handle'>
					<span className='sp-before-after__handle-icon' />
				</span>
			</span>
		</div>
	);
}
