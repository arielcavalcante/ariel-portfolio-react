import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
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
const victorySoundFallbackDurationMs = 4831;

export type FooterCrabGameSounds = {
	hit?: string;
	win?: string;
	lose?: string;
};

type SoundName = keyof FooterCrabGameSounds;

type FooterCrabGameProps = {
	locale: Locale;
	sounds?: FooterCrabGameSounds;
};

type CrabTrivia = {
	text: string;
	wikipediaUrl: string;
};

const trivia: Record<Locale, CrabTrivia[]> = {
	en: [
		{
			text: "Did you know? Fortaleza's fiddler crabs use the Sun as a compass.",
			wikipediaUrl: 'https://en.wikipedia.org/wiki/Sun_compass_in_animals',
		},
		{
			text: 'Did you know? Icapuí is the first place in Ceará to see the sunrise.',
			wikipediaUrl: 'https://en.wikipedia.org/wiki/Icapu%C3%AD',
		},
		{
			text: 'Did you know? Crabs have blue blood.',
			wikipediaUrl: 'https://en.wikipedia.org/wiki/Hemocyanin',
		},
		{
			text: 'Did you know? A crab can regrow an entire claw.',
			wikipediaUrl: 'https://en.wikipedia.org/wiki/Autotomy',
		},
		{
			text: 'Did you know? A crab can see almost 360° without turning its head.',
			wikipediaUrl: 'https://en.wikipedia.org/wiki/Compound_eye',
		},
	],
	'pt-BR': [
		{
			text: 'Você sabia? Os caranguejos chama-maré de Fortaleza usam o Sol como bússola.',
			wikipediaUrl: 'https://en.wikipedia.org/wiki/Sun_compass_in_animals',
		},
		{
			text: 'Você sabia? Icapuí é o primeiro lugar do Ceará a ver o nascer do sol.',
			wikipediaUrl: 'https://pt.wikipedia.org/wiki/Icapu%C3%AD',
		},
		{
			text: 'Você sabia? Caranguejos têm sangue azul.',
			wikipediaUrl: 'https://pt.wikipedia.org/wiki/Hemocianina',
		},
		{
			text: 'Você sabia? Um caranguejo pode regenerar uma garra inteira.',
			wikipediaUrl: 'https://pt.wikipedia.org/wiki/Autotomia',
		},
		{
			text: 'Você sabia? Um caranguejo consegue enxergar quase 360° sem virar a cabeça.',
			wikipediaUrl: 'https://pt.wikipedia.org/wiki/Olho_composto',
		},
	],
};

export function FooterCrabGame({ locale, sounds }: FooterCrabGameProps) {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const rewardWindowRef = useRef<HTMLElement>(null);
	const rewardVideoRef = useRef<HTMLVideoElement>(null);
	const footerVisibleRef = useRef(false);
	const controlsTimeoutRef = useRef<number | null>(null);
	const winningSequenceFinishedRef = useRef(false);
	const losingSequenceStartedRef = useRef(false);
	const victoryPlaybackCleanupRef = useRef<(() => void) | null>(null);
	const hitAudioPoolRef = useRef<HTMLAudioElement[]>([]);
	const hitAudioIndexRef = useRef(0);
	const audioRef = useRef<Record<SoundName, HTMLAudioElement | null>>({
		hit: null,
		win: null,
		lose: null,
	});
	const [isWalking, setIsWalking] = useState(false);
	const [hasLeft, setHasLeft] = useState(false);
	const [hasWon, setHasWon] = useState(false);
	const [clickCount, setClickCount] = useState(0);
	const [jumpCount, setJumpCount] = useState(0);
	const [rewardOpen, setRewardOpen] = useState(false);
	const [rewardEntering, setRewardEntering] = useState(false);
	const [rewardEntranceDurationMs, setRewardEntranceDurationMs] = useState(
		victorySoundFallbackDurationMs,
	);
	const [rewardPlaying, setRewardPlaying] = useState(false);
	const [rewardExpanded, setRewardExpanded] = useState(false);
	const [expandedControlsActive, setExpandedControlsActive] = useState(false);
	const [triviaIndex, setTriviaIndex] = useState(0);

	const label =
		locale === 'pt-BR'
			? 'Clique no caranguejo ou pressione espaço antes que ele escape'
			: 'Click the crab or press Space before it escapes';
	const rewardTitle =
		locale === 'pt-BR' ? 'Vídeo de recompensa' : 'Reward video';
	const closeRewardLabel = locale === 'pt-BR' ? 'Fechar vídeo' : 'Close video';
	const playRewardLabel =
		locale === 'pt-BR' ? 'Reproduzir vídeo' : 'Play video';
	const pauseRewardLabel = locale === 'pt-BR' ? 'Pausar vídeo' : 'Pause video';
	const openRewardLabel =
		locale === 'pt-BR' ? 'Abrir vídeo no YouTube' : 'Open video on YouTube';
	const expandRewardLabel =
		locale === 'pt-BR' ? 'Expandir vídeo' : 'Expand video';
	const contractRewardLabel =
		locale === 'pt-BR' ? 'Sair da tela cheia' : 'Exit full screen';
	const keyboardHint =
		locale === 'pt-BR' ? '(Pressione espaço)' : '(Press space)';
	const replayLabel = locale === 'pt-BR' ? 'Jogar novamente' : 'Play again';
	const wikipediaLabel =
		locale === 'pt-BR'
			? 'Ler mais sobre esta curiosidade na Wikipédia; abre em uma nova aba'
			: 'Read more about this fact on Wikipedia; opens in a new tab';
	const hasLost = hasLeft && !hasWon;
	const currentTrivia = trivia[locale][triviaIndex];

	useEffect(() => {
		const createAudio = (url?: string) => {
			const audio = url ? new Audio(url) : null;
			if (audio) audio.preload = 'auto';
			return audio;
		};

		hitAudioPoolRef.current = sounds?.hit
			? Array.from({ length: winningClickCount }, () => createAudio(sounds.hit)!)
			: [];
		hitAudioIndexRef.current = 0;
		audioRef.current = {
			hit: null,
			win: createAudio(sounds?.win),
			lose: createAudio(sounds?.lose),
		};

		return () => {
			victoryPlaybackCleanupRef.current?.();
			victoryPlaybackCleanupRef.current = null;
			for (const audio of hitAudioPoolRef.current) {
				audio.pause();
			}
			hitAudioPoolRef.current = [];
			hitAudioIndexRef.current = 0;
			for (const audio of Object.values(audioRef.current)) {
				audio?.pause();
			}
			audioRef.current = { hit: null, win: null, lose: null };
		};
	}, [sounds?.hit, sounds?.lose, sounds?.win]);

	const playSound = useCallback((name: SoundName) => {
		if (name === 'hit') {
			const pool = hitAudioPoolRef.current;
			if (pool.length === 0) return;

			const audio = pool[hitAudioIndexRef.current % pool.length];
			hitAudioIndexRef.current += 1;
			audio.currentTime = 0;
			void audio.play().catch(() => undefined);
			return;
		}

		const audio = audioRef.current[name];
		if (!audio) return;

		audio.currentTime = 0;
		void audio.play().catch(() => undefined);
	}, []);

	const handleInteraction = useCallback(() => {
		if (hasLeft || hasWon || losingSequenceStartedRef.current) return;

		playSound('hit');
		const nextCount = clickCount + 1;
		setClickCount(nextCount);
		setJumpCount(count => count + 1);

		if (!isWalking) {
			setIsWalking(true);
		}

		if (nextCount === winningClickCount) {
			setHasWon(true);
		}
	}, [clickCount, hasLeft, hasWon, isWalking, playSound]);

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
		const victoryAudio = audioRef.current.win;
		if (video) {
			video.pause();
			video.currentTime = 0;
		}
		if (victoryAudio) {
			victoryAudio.pause();
			victoryAudio.currentTime = 0;
		}
		for (const hitAudio of hitAudioPoolRef.current) {
			hitAudio.pause();
			hitAudio.currentTime = 0;
		}
		hitAudioIndexRef.current = 0;
		victoryPlaybackCleanupRef.current?.();
		victoryPlaybackCleanupRef.current = null;
		setRewardOpen(false);
		setRewardEntering(false);
		setRewardPlaying(false);
		setRewardExpanded(false);
		setExpandedControlsActive(false);
		setIsWalking(false);
		setHasLeft(false);
		setHasWon(false);
		setClickCount(0);
		setJumpCount(0);
		winningSequenceFinishedRef.current = false;
		losingSequenceStartedRef.current = false;
	}, []);

	const finishWinningSequence = useCallback(() => {
		if (winningSequenceFinishedRef.current) return;
		winningSequenceFinishedRef.current = true;
		setHasLeft(true);

		const victoryAudio = audioRef.current.win;
		const reportedDurationMs = victoryAudio?.duration
			? victoryAudio.duration * 1000
			: Number.NaN;

		setRewardEntranceDurationMs(
			Number.isFinite(reportedDurationMs)
				? reportedDurationMs
				: victorySoundFallbackDurationMs,
		);
		setRewardPlaying(false);
		setRewardExpanded(false);
		setRewardEntering(Boolean(victoryAudio));
		setRewardOpen(true);

		if (!victoryAudio) {
			return;
		}

		let hasFinished = false;
		const finishPlayback = () => {
			if (hasFinished) return;
			hasFinished = true;
			victoryAudio.removeEventListener('ended', finishPlayback);
			victoryAudio.removeEventListener('error', finishPlayback);
			victoryPlaybackCleanupRef.current = null;
			setRewardEntering(false);
		};
		const cleanupPlayback = () => {
			hasFinished = true;
			victoryAudio.removeEventListener('ended', finishPlayback);
			victoryAudio.removeEventListener('error', finishPlayback);
		};

		victoryPlaybackCleanupRef.current = cleanupPlayback;
		victoryAudio.addEventListener('ended', finishPlayback);
		victoryAudio.addEventListener('error', finishPlayback);
		victoryAudio.currentTime = 0;
		void victoryAudio.play().catch(finishPlayback);
	}, []);

	const finishLosingSequence = useCallback(() => {
		if (losingSequenceStartedRef.current) return;
		losingSequenceStartedRef.current = true;

		setTriviaIndex(currentIndex => {
			const randomIndex = Math.floor(Math.random() * trivia[locale].length);
			return randomIndex === currentIndex
				? (randomIndex + 1) % trivia[locale].length
				: randomIndex;
		});
		playSound('lose');
		setHasLeft(true);
	}, [locale, playSound]);

	useEffect(() => {
		if (!isWalking || hasWon || hasLeft) return;

		let frameId = 0;
		const detectViewportExit = () => {
			const crab = buttonRef.current;
			if (crab && crab.getBoundingClientRect().left >= window.innerWidth) {
				finishLosingSequence();
				return;
			}

			frameId = window.requestAnimationFrame(detectViewportExit);
		};

		frameId = window.requestAnimationFrame(detectViewportExit);
		return () => window.cancelAnimationFrame(frameId);
	}, [finishLosingSequence, hasLeft, hasWon, isWalking]);

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
				hasWon ||
				hasLeft
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
	}, [handleInteraction, hasLeft, hasWon, rewardOpen]);

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
							rewardEntering ? ' is-victory-entering' : ''
						}${rewardExpanded ? ' is-expanded' : ''}${
							expandedControlsActive ? ' is-controls-active' : ''
						}`}
						style={
							{
								'--crab-reward-intro-duration': `${rewardEntranceDurationMs}ms`,
							} as CSSProperties
						}
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
			<div
				className={`footer-crab-game${isWalking ? ' is-active' : ''}${
					hasLost ? ' has-result' : ''
				}`}
			>
				{hasLost ? (
					<div className='footer-crab-result'>
						<span
							className='visually-hidden'
							role='status'
							aria-live='polite'
							aria-atomic='true'
						>
							{currentTrivia.text}
						</span>
						<button
							className='footer-crab-result__replay'
							type='button'
							aria-label={`${replayLabel}. ${currentTrivia.text}`}
							onClick={resetGame}
						>
							<span aria-hidden='true' />
						</button>
						<p className='footer-crab-result__trivia'>
							{currentTrivia.text}{' '}
							<a
								className='footer-crab-result__source'
								href={currentTrivia.wikipediaUrl}
								target='_blank'
								rel='noreferrer'
								aria-label={wikipediaLabel}
							>
								<span aria-hidden='true' />
							</a>
						</p>
					</div>
				) : (
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
								finishLosingSequence();
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
						<span className='footer-crab__hint' aria-hidden='true'>
							{keyboardHint}
						</span>
						{clickCount > 0 && (
							<span
								className='footer-crab__count'
								aria-live='polite'
								key={`count-${clickCount}`}
							>
								<img
									className='footer-crab__count-burst'
									src='/assets/icons/explosion-rays-burst-loop.svg'
									alt=''
									aria-hidden='true'
								/>
								<span>{clickCount}</span>
							</span>
						)}
					</button>
				)}
			</div>
			{rewardPlayer}
		</>
	);
}
