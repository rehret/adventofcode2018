import { getGuardDetails } from '../lib/guard-event-log-processor';

export function strategy2(input: string): number {
	const guards = getGuardDetails(input);
	const targetGuard = guards.reduce((target, guard) => {
		const guardMaxSleep = guard.minutesAsleep.get(guard.mostFrequentMinuteAsleep) || 0;
		const targetMaxSleep = target.minutesAsleep.get(target.mostFrequentMinuteAsleep) || 0;

		return guardMaxSleep > targetMaxSleep ? guard : target;
	}, guards[0]);

	const targetMinute = targetGuard.mostFrequentMinuteAsleep;

	if (targetMinute === -1) {
		throw new Error('No guards were asleep');
	}

	return targetGuard.id * targetMinute;
}
