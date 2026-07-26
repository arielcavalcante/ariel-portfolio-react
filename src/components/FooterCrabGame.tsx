import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Locale } from '../content';

const rewardVideoPath = `/files/${encodeURIComponent(
	'CARANGUEJOS PROTESTANDO, SALVEM O NOSSO COCÓ!.webm',
)}`;
const rewardVideoUrl = import.meta.env.DEV
	? `https://arielcavalcante.com${rewardVideoPath}`
	: rewardVideoPath;
const rewardExternalUrl = 'https://www.youtube.com/watch?v=4k90z5fyon8';
const winningClickCount = 10;

type FooterCrabGameProps = {
	locale: Locale;
};

export function FooterCrabGame({ locale }: FooterCrabGameProps) {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const rewardWindowRef = useRef<HTMLElement>(null);
	const rewardVideoRef = useRef<HTMLVideoElement>(null);
	const footerVisibleRef = useRef(false);
	const controlsTimeoutRef = useRef<number | null>(null);
	const [isWalking, setIsWalking] = useState(false);
	const [hasLeft, setHasLeft] = useState(false);
	const [hasWon, setHasWon] = useState(false);
	const [clickCount, setClickCount] = useState(0);
	const [jumpCount, setJumpCount] = useState(0);
	const [rewardOpen, setRewardOpen] = useState(false);
	const [rewardPlaying, setRewardPlaying] = useState(false);
	const [rewardExpanded, setRewardExpanded] = useState(false);
	const [expandedControlsActive, setExpandedControlsActive] = useState(false);

	const label =
		locale === 'pt-BR'
			? 'Clique no caranguejo ou pressione espaço antes que ele escape'
			: 'Click the crab or press Space before it escapes';
	const rewardTitle =
		locale === 'pt-BR' ? 'Vídeo de recompensa' : 'Reward video';
	const closeRewardLabel =
		locale === 'pt-BR' ? 'Fechar vídeo' : 'Close video';
	const playRewardLabel =
		locale === 'pt-BR' ? 'Reproduzir vídeo' : 'Play video';
	const pauseRewardLabel =
		locale === 'pt-BR' ? 'Pausar vídeo' : 'Pause video';
	const openRewardLabel =
		locale === 'pt-BR' ? 'Abrir vídeo no YouTube' : 'Open video on YouTube';
	const expandRewardLabel =
		locale === 'pt-BR' ? 'Expandir vídeo' : 'Expand video';
	const contractRewardLabel =
		locale === 'pt-BR' ? 'Sair da tela cheia' : 'Exit full screen';

	const handleInteraction = useCallback(() => {
		if (hasLeft || hasWon) return;

		const nextCount = clickCount + 1;
		setClickCount(nextCount);
		setJumpCount(count => count + 1);

		if (!isWalking) {
			setIsWalking(true);
		}

		if (nextCount === winningClickCount) {
			setHasWon(true);
		}
	}, [clickCount, hasLeft, hasWon, isWalking]);

	const toggleRewardPlayback = useCallback(() => {
		const video = rewardVideoRef.current;
		if (!video) return;

		if (video.paused) {
			void video.play().catch(() => {
				setRewardPlaying(false);
			});
		} else {
			video.pause();
		}
	}, []);

	const hideExpandedControls = useCallback(() => {
		if (controlsTimeoutRef.current !== null) {
			window.clearTimeout(controlsTimeoutRef.current);
			controlsTimeoutRef.current = null;
		}
		setExpandedControlsActive(false);
	}, []);

	const showExpandedControls = useCallback(() => {
		if (!rewardExpanded) return;

		setExpandedControlsActive(true);
		if (controlsTimeoutRef.current !== null) {
			window.clearTimeout(controlsTimeoutRef.current);
		}
		controlsTimeoutRef.current = window.setTimeout(() => {
			controlsTimeoutRef.current = null;
			setExpandedControlsActive(false);
		}, 1200);
	}, [rewardExpanded]);

	const resetGame = useCallback(() => {
		const video = rewardVideoRef.current;
		if (video) {
			video.pause();
			video.currentTime = 0;
		}

		setRewardOpen(false);
		setRewardPlaying(false);
		setRewardExpanded(false);
		setExpandedControlsActive(false);
		setIsWalking(false);
		setHasLeft(false);
		setHasWon(false);
		setClickCount(0);
		setJumpCount(0);
	}, []);

	const finishWinningSequence = useCallback(() => {
		setHasLeft(true);
		setRewardPlaying(false);
		setRewardExpanded(false);
		setRewardOpen(true);
	}, []);

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
				!footerVisibleRef.current ||
				rewardOpen ||
				hasWon
			) {
				return;
			}

			const target = event.target as HTMLElement | null;
			if (
				target?.isContentEditable ||
				target?.closest('a, button, input, textarea, select')
			) {
				return;
			}

			event.preventDefault();
			handleInteraction();
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [handleInteraction, hasWon, rewardOpen]);

	useEffect(() => {
		if (!hasWon || rewardOpen) return;

		const fallback = window.setTimeout(finishWinningSequence, 1050);
		return () => window.clearTimeout(fallback);
	}, [finishWinningSequence, hasWon, rewardOpen]);

	useEffect(() => {
		if (!rewardOpen) return;

		rewardWindowRef.current?.focus({ preventScroll: true });

		const handleRewardKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				event.preventDefault();
				if (rewardExpanded) {
					setRewardExpanded(false);
				} else {
					resetGame();
				}
				return;
			}

			if (event.code !== 'Space' || event.repeat) return;

			const target = event.target as HTMLElement | null;
			if (
				target?.isContentEditable ||
				target?.closest('a, button, input, textarea, select')
			) {
				return;
			}

			event.preventDefault();
			toggleRewardPlayback();
		};

		window.addEventListener('keydown', handleRewardKey);
		return () => window.removeEventListener('keydown', handleRewardKey);
	}, [resetGame, rewardExpanded, rewardOpen, toggleRewardPlayback]);

	useEffect(() => {
		if (!rewardExpanded) return;

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = previousOverflow;
			if (controlsTimeoutRef.current !== null) {
				window.clearTimeout(controlsTimeoutRef.current);
				controlsTimeoutRef.current = null;
			}
			setExpandedControlsActive(false);
		};
	}, [rewardExpanded]);

	const rewardPlayer =
		rewardOpen && typeof document !== 'undefined'
			? createPortal(
					<aside
						ref={rewardWindowRef}
						className={`crab-reward${
							rewardExpanded ? ' is-expanded' : ''
						}${
							expandedControlsActive ? ' is-controls-active' : ''
						}`}
						aria-label={rewardTitle}
						tabIndex={-1}
						onMouseMove={showExpandedControls}
						onMouseLeave={hideExpandedControls}
					>
						<div className='crab-reward__media'>
							<video
								ref={rewardVideoRef}
								src={rewardVideoUrl}
								preload='metadata'
								playsInline
								onClick={toggleRewardPlayback}
								onPlay={() => setRewardPlaying(true)}
								onPause={() => setRewardPlaying(false)}
								onEnded={resetGame}
							/>

							{!rewardPlaying && (
								<button
									className='crab-reward__play'
									type='button'
									aria-label={playRewardLabel}
									onClick={toggleRewardPlayback}
								>
									<span aria-hidden='true' />
								</button>
							)}

							{rewardPlaying && (
								<button
									className='crab-reward__pause'
									type='button'
									aria-label={pauseRewardLabel}
									onClick={toggleRewardPlayback}
								>
									<span aria-hidden='true' />
								</button>
							)}
						</div>

						<button
							className='crab-reward__control crab-reward__close'
							type='button'
							aria-label={closeRewardLabel}
							onClick={resetGame}
						>
							<span aria-hidden='true' />
						</button>

						<a
							className='crab-reward__control crab-reward__external'
							href={rewardExternalUrl}
							target='_blank'
							rel='noreferrer'
							aria-label={openRewardLabel}
						>
							<span aria-hidden='true' />
						</a>

						<button
							className='crab-reward__control crab-reward__expand'
							type='button'
							aria-label={
								rewardExpanded ? contractRewardLabel : expandRewardLabel
							}
							aria-pressed={rewardExpanded}
							onClick={() => setRewardExpanded(expanded => !expanded)}
						>
							<span aria-hidden='true' />
						</button>
					</aside>,
					document.body,
				)
			: null;

	return (
		<>
			<button
				ref={buttonRef}
				className={`footer-crab${isWalking ? ' is-walking' : ''}${
					jumpCount > 0 ? ' has-jumped' : ''
				}${hasWon ? ' is-winning' : ''}${hasLeft ? ' has-left' : ''}`}
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
				<span
					className='footer-crab__jump'
					key={`jump-${jumpCount}`}
					onAnimationEnd={event => {
						if (event.animationName === 'crab-win-fall') {
							finishWinningSequence();
						}
					}}
				>
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
			{rewardPlayer}
		</>
	);
}
