type InteractionTiming = PerformanceEntry & {
	interactionId: number;
	processingStart: number;
	processingEnd: number;
	target: Node | null;
};

export function observeSlowInteractions() {
	if (!('PerformanceObserver' in window)) return;

	try {
		const observer = new PerformanceObserver(list => {
			for (const entry of list.getEntries() as InteractionTiming[]) {
				if (!entry.interactionId || entry.duration < 200) continue;

				const target =
					entry.target instanceof Element
						? entry.target.closest<HTMLElement>(
								'button, a, [role], input, select, textarea',
							) ?? entry.target
						: null;
				const diagnostic = {
					name: entry.name,
					duration: Math.round(entry.duration),
					inputDelay: Math.round(entry.processingStart - entry.startTime),
					processingTime: Math.round(
						entry.processingEnd - entry.processingStart,
					),
					presentationDelay: Math.round(
						entry.startTime + entry.duration - entry.processingEnd,
					),
					target:
						target instanceof Element
							? target.getAttribute('aria-label') ||
								target.textContent?.trim().slice(0, 80) ||
								target.tagName.toLowerCase()
							: 'unknown',
					path: window.location.pathname,
				};

				try {
					sessionStorage.setItem(
						'portfolio:last-slow-interaction',
						JSON.stringify(diagnostic),
					);
				} catch {
					// Storage can be unavailable in restricted browsing modes.
				}
				console.warn('[INP] Slow interaction', diagnostic);
			}
		});

		observer.observe({
			type: 'event',
			buffered: true,
			durationThreshold: 40,
		} as PerformanceObserverInit);
	} catch {
		// Event Timing is not available in every browser.
	}
}
