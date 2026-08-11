import {
	useEffect,
	useRef,
	useState,
	type CSSProperties,
	type ReactNode,
	type MouseEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { contact, siteContent, type Locale } from '../content';

type CopyEmailButtonProps = {
	locale: Locale;
	className?: string;
	children: ReactNode;
};

type ToastPalette = CSSProperties & {
	'--copy-toast-background': string;
	'--copy-toast-color': string;
};

function copyWithFallback(value: string) {
	const input = document.createElement('textarea');
	input.value = value;
	input.setAttribute('readonly', '');
	input.style.position = 'fixed';
	input.style.opacity = '0';
	document.body.appendChild(input);
	input.select();

	try {
		return document.execCommand('copy');
	} catch {
		return false;
	} finally {
		input.remove();
	}
}

async function copyText(value: string) {
	if (navigator.clipboard?.writeText) {
		try {
			await navigator.clipboard.writeText(value);
			return true;
		} catch {
			// Fall back for browsers or contexts that deny Clipboard API access.
		}
	}

	return copyWithFallback(value);
}

export function CopyEmailButton({
	locale,
	className,
	children,
}: CopyEmailButtonProps) {
	const [toastVisible, setToastVisible] = useState(false);
	const [toastPalette, setToastPalette] = useState<ToastPalette>();
	const timeoutRef = useRef<number>();
	const labels = siteContent[locale].common;

	useEffect(
		() => () => {
			window.clearTimeout(timeoutRef.current);
		},
		[],
	);

	async function handleCopy(event: MouseEvent<HTMLButtonElement>) {
		const button = event.currentTarget;
		const copied = await copyText(contact.email);
		if (!copied) return;

		const buttonColor = getComputedStyle(button).color;
		const surface = button.closest<HTMLElement>(
			'.desktop-nav, .site-footer',
		);
		const computedSurfaceColor = surface
			? getComputedStyle(surface).backgroundColor
			: '';
		const surfaceColor =
			computedSurfaceColor && computedSurfaceColor !== 'rgba(0, 0, 0, 0)'
				? computedSurfaceColor
				: getComputedStyle(document.documentElement).backgroundColor;

		setToastPalette({
			'--copy-toast-background': buttonColor,
			'--copy-toast-color': surfaceColor,
		});
		setToastVisible(true);
		window.clearTimeout(timeoutRef.current);
		timeoutRef.current = window.setTimeout(() => {
			setToastVisible(false);
		}, 3000);
	}

	function dismissToast() {
		window.clearTimeout(timeoutRef.current);
		setToastVisible(false);
	}

	return (
		<>
			<button
				className={`copy-email-button${className ? ` ${className}` : ''}`}
				type='button'
				onClick={handleCopy}
				aria-label={labels.copyEmail}
				title={labels.copyEmail}
			>
				{children}
			</button>
			{toastVisible &&
				createPortal(
					<button
						className='copy-email-toast'
						type='button'
						style={toastPalette}
						onClick={dismissToast}
						aria-label={`${labels.emailCopied} ${labels.dismissNotification}`}
					>
						<span aria-live='polite' aria-atomic='true'>
							{labels.emailCopied}
						</span>
					</button>,
					document.body,
				)}
		</>
	);
}
