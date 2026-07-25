import { useCallback, useEffect, useRef, useState } from 'react';
import type { Locale } from '../content';

const rewardUrl = 'https://www.youtube.com/watch?v=4k90z5fyon8';
const winningClickCount = 10;

type FooterCrabGameProps = {
	locale: Locale;
};

export function FooterCrabGame({ locale }: FooterCrabGameProps) {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const footerVisibleRef = useRef(false);
	const [isWalking, setIsWalking] = useState(false);
	const [hasLeft, setHasLeft] = useState(false);
	const [clickCount, setClickCount] = useState(0);
	const [jumpCount, setJumpCount] = useState(0);

	const label =
		locale === 'pt-BR'
			? 'Clique no caranguejo ou pressione espaço antes que ele escape'
			: 'Click the crab or press Space before it escapes';

	const handleInteraction = useCallback(() => {
		if (hasLeft) return;

		const nextCount = clickCount + 1;
		setClickCount(nextCount);
		setJumpCount(count => count + 1);

		if (!isWalking) {
			setIsWalking(true);
		}

		if (nextCount === winningClickCount) {
			window.open(rewardUrl, '_blank', 'noopener,noreferrer');
		}
	}, [clickCount, hasLeft, isWalking]);

	useEffect(() => {
		const footer = buttonRef.current?.closest('.site-footer');
		if (!footer) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				footerVisibleRef.current = entry.isIntersecting;
			},
			{ threshold: 0 },
		);

		observer.observe(footer);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (
				event.code !== 'Space' ||
				event.repeat ||
				!footerVisibleRef.current
			) {
				return;
			}

			const target = event.target as HTMLElement | null;
			if (
				target?.isContentEditable ||
				target?.closest('input, textarea, select')
			) {
				return;
			}

			event.preventDefault();
			handleInteraction();
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [handleInteraction]);

	return (
		<button
			ref={buttonRef}
			className={`footer-crab${isWalking ? ' is-walking' : ''}${
				jumpCount > 0 ? ' has-jumped' : ''
			}${hasLeft ? ' has-left' : ''}`}
			type='button'
			aria-label={label}
			onClick={handleInteraction}
			onAnimationEnd={event => {
				if (
					event.currentTarget === event.target &&
					event.animationName === 'crab-walk'
				) {
					setHasLeft(true);
				}
			}}
		>
			<span className='footer-crab__jump' key={`jump-${jumpCount}`}>
				<img
					className='footer-crab__still'
					src='/assets/icons/crab.svg'
					alt=''
					aria-hidden='true'
				/>
				<img
					className='footer-crab__walking'
					src='/assets/icons/crab-walking.svg'
					alt=''
					aria-hidden='true'
				/>
			</span>
			{clickCount > 0 && (
				<span
					className='footer-crab__count'
					aria-live='polite'
					key={`count-${clickCount}`}
				>
					{clickCount}
				</span>
			)}
		</button>
	);
}
