export namespace utils {
	export function assert(condition: unknown, message = "Assertion failed"): asserts condition {
		if (!condition) {
			throw new Error(message);
		}
	}

	// biome-ignore lint/suspicious/noExplicitAny: to preserve the type of the original function
	export function throttle<C extends (...args: any[]) => void, P extends Parameters<C>>(
		original: C,
		wait: number,
	): ((...args: P) => void) & { cancel: () => void } {
		let latestArgs: P | undefined;
		let timeout: ReturnType<typeof setTimeout> | null = null;

		function timeoutFn() {
			utils.assert(latestArgs);
			original.apply(null, latestArgs);
			latestArgs = undefined;
			timeout = null;
		}

		function throttled(...args: P) {
			latestArgs = args;
			if (!timeout) {
				timeout = setTimeout(timeoutFn, wait);
			}
		}

		throttled.cancel = function cancel() {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
		};

		return throttled;
	}
}
