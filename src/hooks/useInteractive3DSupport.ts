import { useEffect, useState } from 'react';

const MIN_TEXTURE_SIZE = 4096;
const MIN_RENDERBUFFER_SIZE = 4096;

function isIOSWebKit() {
	const { maxTouchPoints, platform, userAgent } = window.navigator;

	return (
		/iPad|iPhone|iPod/.test(userAgent) ||
		(platform === 'MacIntel' && maxTouchPoints > 1)
	);
}

function hasReliableWebGL2() {
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('webgl2', {
		alpha: true,
		antialias: true,
		failIfMajorPerformanceCaveat: true,
		powerPreference: 'high-performance',
	});

	if (!context) return false;

	const hasCapacity =
		context.getParameter(context.MAX_TEXTURE_SIZE) >= MIN_TEXTURE_SIZE &&
		context.getParameter(context.MAX_RENDERBUFFER_SIZE) >=
			MIN_RENDERBUFFER_SIZE;

	context.getExtension('WEBGL_lose_context')?.loseContext();
	return hasCapacity;
}

export function supportsInteractive3D() {
	if (typeof window === 'undefined') return false;

	// iOS WebKit may create a valid WebGL2 context but still fail to composite
	// this scene reliably. Keep the static render until a mobile-specific scene
	// can be validated across current iPhone and iPad hardware.
	if (isIOSWebKit()) return false;

	try {
		return hasReliableWebGL2();
	} catch {
		return false;
	}
}

export function useInteractive3DSupport() {
	const [isSupported, setIsSupported] = useState(false);

	useEffect(() => {
		setIsSupported(supportsInteractive3D());
	}, []);

	return isSupported;
}
