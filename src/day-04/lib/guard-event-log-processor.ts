import { Event } from './event';
import { GuardEvent, GuardEventType } from './guard-event';
import { GuardDetail } from './guard-detail';

const lineRegex = /^\[(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2})\]\s+(.+)$/;
const guardBeginShiftRegex = /^Guard\s+#(\d+)\s+begins\s+shift$/i;
const guardFallsAsleepRegex = /^falls\s+asleep$/i;
const guardWakesUpRegex = /^wakes\s+up$/i;

export function getGuardDetails(eventLog: string): GuardDetail[] {
	const guardEvents = getGuardEventsFromEventLog(eventLog);
	const guards = new Map<number, GuardDetail>();

	let asleepAt = -1;
	for (const event of guardEvents) {
		if (event.eventType === GuardEventType.BeginShift) {
			asleepAt = -1;
			if (!guards.has(event.guardId)) {
				guards.set(event.guardId, new GuardDetail(event.guardId));
			}
		} else if (event.eventType === GuardEventType.FallAsleep) {
			asleepAt = event.timestamp.getMinutes();
		} else {
			const awakeAt = event.timestamp.getMinutes();

			if (guards.has(event.guardId)) {
				const guardDetail = guards.get(event.guardId) as GuardDetail;

				for (let minute = asleepAt; minute < awakeAt; minute++) {
					guardDetail.minutesAsleep.set(minute, (guardDetail.minutesAsleep.get(minute) || 0) + 1);
				}
			}

			asleepAt = -1;
		}
	}

	return Array.from(guards.values());
}

function getGuardEventsFromEventLog(eventLog: string): GuardEvent[] {
	const events = parseEventLogIntoEvents(eventLog);
	return processEventsIntoGuardEvents(events);
}

function parseEventLogIntoEvents(eventLog: string): Event[] {
	const lines = eventLog.trim().split(/\n/);

	const events: Event[] = [];

	for (const line of lines) {
		const matches = line.trim().match(lineRegex);

		if (matches === null) {
			throw new Error('Invalid input format');
		}

		events.push(new Event(new Date(matches[1].trim()), matches[2].trim()));
	}

	return events.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
}

function processEventsIntoGuardEvents(events: Event[]): GuardEvent[] {
	let currentGuardId = -1;
	return events.map((event) => {
		if (guardBeginShiftRegex.test(event.message)) {
			const matches = event.message.match(guardBeginShiftRegex) as RegExpMatchArray;
			currentGuardId = parseInt(matches[1]);
			return new GuardEvent(event.timestamp, currentGuardId, GuardEventType.BeginShift);
		} else if (guardFallsAsleepRegex.test(event.message)) {
			return new GuardEvent(event.timestamp, currentGuardId, GuardEventType.FallAsleep);
		} else if (guardWakesUpRegex.test(event.message)) {
			return new GuardEvent(event.timestamp, currentGuardId, GuardEventType.WakeUp);
		} else {
			throw new Error('Unknown guard event');
		}
	});
}
