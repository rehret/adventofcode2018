import { getGuardDetails } from '../lib/guard-event-log-processor';
import { GuardDetail } from '../lib/guard-detail';

export function getTargetGuardAndMinute(input: string): any {
	const guards = getGuardDetails(input);
	const targetGuard = guards.reduce((target, guard) => guard.minutesAsleep > target.minutesAsleep ? guard : target);
	const targetMinute = getMostFrequentMinuteAsleep(targetGuard);

	return targetGuard.id * targetMinute;
}

function getMostFrequentMinuteAsleep(guard: GuardDetail): number {
	return Array.from(guard.minutesAsleep.keys()).reduce((mostFrequent, minute) => {
		return (guard.minutesAsleep.get(minute) || 0) > (guard.minutesAsleep.get(mostFrequent) || 0)
			? minute
			: mostFrequent;
	});
}
