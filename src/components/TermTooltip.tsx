import {
	useEffect,
	useId,
	useLayoutEffect,
	useRef,
	useState,
	type CSSProperties,
	type FocusEvent,
	type PointerEvent,
	type ReactNode,
} from 'react';

export type GlossaryTerm = {
	definition: string;
	label: string;
	triggerLabel: string;
};

type TermTooltipProps = GlossaryTerm;

type AnnotatedTextProps = {
	sectionTexts?: readonly string[];
	terms: readonly GlossaryTerm[];
	text: string;
	textIndex?: number;
};

export function AnnotatedText({
	sectionTexts,
	terms,
	text,
	textIndex = 0,
}: AnnotatedTextProps) {
	const parts: ReactNode[] = [];
	const annotatedTerms = new Set<string>();
	const termsUsedEarlier = new Set(
		terms
			.filter(term =>
				sectionTexts
					?.slice(0, textIndex)
					.some(sectionText => sectionText.includes(term.label)),
			)
			.map(term => term.label),
	);
	let cursor = 0;
	let occurrence = 0;

	while (cursor < text.length) {
		const nextTerm = terms
			.map(term => ({ term, index: text.indexOf(term.label, cursor) }))
			.filter(match => match.index !== -1)
			.sort(
				(first, second) =>
					first.index - second.index ||
					second.term.label.length - first.term.label.length,
			)[0];

		if (!nextTerm) {
			parts.push(text.slice(cursor));
			break;
		}

		if (nextTerm.index > cursor) {
			parts.push(text.slice(cursor, nextTerm.index));
		}

		const shouldAnnotate =
			!termsUsedEarlier.has(nextTerm.term.label) &&
			!annotatedTerms.has(nextTerm.term.label);

		if (shouldAnnotate) {
			parts.push(
				<TermTooltip
					key={`${nextTerm.term.label}-${occurrence}`}
					{...nextTerm.term}
				/>,
			);
		} else {
			parts.push(nextTerm.term.label);
		}

		annotatedTerms.add(nextTerm.term.label);
		cursor = nextTerm.index + nextTerm.term.label.length;
		occurrence += 1;
	}

	return <>{parts}</>;
}

export function TermTooltip({
	definition,
	label,
	triggerLabel,
}: TermTooltipProps) {
	const [open, setOpen] = useState(false);
	const [viewportShift, setViewportShift] = useState({ x: 0, y: 0 });
	const rootRef = useRef<HTMLSpanElement>(null);
	const surfaceRef = useRef<HTMLSpanElement>(null);
	const viewportShiftRef = useRef(viewportShift);
	const tooltipId = useId();

	useLayoutEffect(() => {
		if (!open) return;

		const keepInsideViewport = () => {
			const surface = surfaceRef.current;
			if (!surface) return;

			const margin = 24;
			const currentShift = viewportShiftRef.current;
			const bounds = surface.getBoundingClientRect();
			const baseBounds = {
				bottom: bounds.bottom - currentShift.y,
				left: bounds.left - currentShift.x,
				right: bounds.right - currentShift.x,
				top: bounds.top - currentShift.y,
			};
			let x = 0;
			let y = 0;

			if (baseBounds.left < margin) x = margin - baseBounds.left;
			if (baseBounds.right > window.innerWidth - margin) {
				x = window.innerWidth - margin - baseBounds.right;
			}
			if (baseBounds.top < margin) y = margin - baseBounds.top;
			if (baseBounds.bottom > window.innerHeight - margin) {
				y = window.innerHeight - margin - baseBounds.bottom;
			}

			const nextShift = { x, y };
			if (
				Math.abs(currentShift.x - nextShift.x) < 0.5 &&
				Math.abs(currentShift.y - nextShift.y) < 0.5
			) {
				return;
			}
			viewportShiftRef.current = nextShift;
			setViewportShift(nextShift);
		};

		keepInsideViewport();
		window.addEventListener('resize', keepInsideViewport);
		window.addEventListener('scroll', keepInsideViewport, true);

		return () => {
			window.removeEventListener('resize', keepInsideViewport);
			window.removeEventListener('scroll', keepInsideViewport, true);
		};
	}, [open]);

	useEffect(() => {
		if (!open) return;

		const closeOnOutsidePress = (event: globalThis.PointerEvent) => {
			if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
		};
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setOpen(false);
		};

		document.addEventListener('pointerdown', closeOnOutsidePress);
		document.addEventListener('keydown', closeOnEscape);

		return () => {
			document.removeEventListener('pointerdown', closeOnOutsidePress);
			document.removeEventListener('keydown', closeOnEscape);
		};
	}, [open]);

	const openForMouse = (event: PointerEvent<HTMLSpanElement>) => {
		if (event.pointerType === 'mouse') setOpen(true);
	};

	const closeForMouse = (event: PointerEvent<HTMLSpanElement>) => {
		if (event.pointerType === 'mouse') setOpen(false);
	};

	const closeOnBlur = (event: FocusEvent<HTMLSpanElement>) => {
		if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
	};

	return (
		<span
			ref={rootRef}
			className={`term-tooltip${open ? ' is-open' : ''}`}
			onBlur={closeOnBlur}
			onPointerEnter={openForMouse}
			onPointerLeave={closeForMouse}
		>
			<span className='term-tooltip__term'>{label}</span>
			<button
				className='term-tooltip__trigger'
				type='button'
				aria-expanded={open}
				aria-label={triggerLabel}
				aria-describedby={open ? tooltipId : undefined}
				onClick={() => setOpen(current => !current)}
			>
				<span aria-hidden='true' />
			</button>
			{open && (
				<span
					ref={surfaceRef}
					className='term-tooltip__surface'
					id={tooltipId}
					role='tooltip'
					style={
						{
							'--term-tooltip-shift-x': `${viewportShift.x}px`,
							'--term-tooltip-shift-y': `${viewportShift.y}px`,
						} as CSSProperties
					}
					onClick={() => setOpen(false)}
				>
					{definition}
				</span>
			)}
		</span>
	);
}
