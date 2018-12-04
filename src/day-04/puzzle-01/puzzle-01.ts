import { getGuardDetails } from '../lib/guard-event-log-processor';
import { GuardDetail } from '../lib/guard-detail';

export function getTargetGuardAndMinute(input: string): any {
	const guards = getGuardDetails(input);
	const targetGuard = guards.reduce((target, guard) => guard.totalMinutesAsleep > target.totalMinutesAsleep ? guard : target);
	const targetMinute = getMostFrequentMinuteAsleep(targetGuard);

	return targetGuard.id * targetMinute;
}

function getMostFrequentMinuteAsleep(guard: GuardDetail): number {
	return Array.from(guard.minutesAsleep.entries())
		.map((keyValueArray) => ({ minute: keyValueArray[0], occurances: keyValueArray[1] }))
		.reduce((mostFrequent, minute) => {
			return minute.occurances > mostFrequent.occurances ? minute : mostFrequent;
		}).minute;
}
