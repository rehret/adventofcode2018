import { getGuardDetails } from '../lib/guard-event-log-processor';

export function strategy1(input: string): any {
	const guards = getGuardDetails(input);
	const targetGuard = guards.reduce((target, guard) => guard.totalMinutesAsleep > target.totalMinutesAsleep ? guard : target, guards[0]);

	return targetGuard.id * targetGuard.mostFrequentMinuteAsleep;
}
