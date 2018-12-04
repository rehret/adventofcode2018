import { assert } from 'chai';
import { Event } from './lib/event';
import { GuardEventType, GuardEvent } from './lib/guard-event';
import { GuardDetail } from './lib/guard-detail';
import { getGuardDetails } from './lib/guard-event-log-processor';
import { strategy1 } from './puzzle-01';
import { strategy2 } from './puzzle-02';

describe('day-04', () => {
	describe('lib', () => {
		describe('Event', () => {
			it('should assign properties from constructor parameters', () => {
				// Arrange
				const isoTimestamp = '2018-01-01 01:02:03';
				const inputTimestamp = new Date(isoTimestamp);
				const inputMessage = 'test event message';

				// Act
				const result = new Event(inputTimestamp, inputMessage);

				// Assert
				assert.deepEqual(result.timestamp, new Date(isoTimestamp));
				assert.equal(result.message, inputMessage);
			});
		});

		describe('GuardEvent', () => {
			it('should assign properties from constructor parameters', () => {
				// Arrange
				const isoTimestamp = '2018-01-01 01:02:03';
				const inputTimestamp = new Date(isoTimestamp);
				const inputId = 7;
				const inputEventType = GuardEventType.WakeUp;

				// Act
				const result = new GuardEvent(inputTimestamp, inputId, inputEventType);

				// Assert
				assert.deepEqual(result.timestamp, new Date(isoTimestamp));
				assert.equal(result.guardId, inputId);
				assert.equal(result.eventType, GuardEventType.WakeUp);
			});
		});

		describe('GuardDetail', () => {
			describe('constructor', () => {
				it('should assign properties from constructor parameters', () => {
					// Arrange
					const inputId = 7;

					// Act
					const result = new GuardDetail(inputId);

					// Assert
					assert.equal(result.id, inputId);
				});

				it('should initialize minutesAsleep property', () => {
					// Act
					const result = new GuardDetail(1);

					// Assert
					assert.isDefined(result.minutesAsleep);
					assert.isTrue(result.minutesAsleep instanceof Map);
				});
			});

			describe('totalMinutesAsleep property', () => {
				it('should sum the minutes asleep', () => {
					// Arrange
					const guard = new GuardDetail(1);
					guard.minutesAsleep.set(1, 1);
					guard.minutesAsleep.set(2, 10);
					guard.minutesAsleep.set(3, 5);
					guard.minutesAsleep.set(5, 20);

					// Act
					const totalMinutesAsleep = guard.totalMinutesAsleep;

					// Assert
					assert.equal(totalMinutesAsleep, 36);
				});

				it('should return 0 if the guard was never asleep', () => {
					// Arrange
					const guard = new GuardDetail(1);

					// Act
					const totalMinutesAsleep = guard.totalMinutesAsleep;

					// Assert
					assert.equal(totalMinutesAsleep, 0);
				});
			});

			describe('mostFrequentMinuteAsleep property', () => {
				it('should get the minute which the guard was most frequently asleep', () => {
					// Arrange
					const guard = new GuardDetail(1);
					guard.minutesAsleep.set(1, 1);
					guard.minutesAsleep.set(2, 20);
					guard.minutesAsleep.set(3, 5);
					guard.minutesAsleep.set(5, 10);

					// Act
					const result = guard.mostFrequentMinuteAsleep;

					// Assert
					assert.equal(result, 2);
				});

				it('should return -1 if the guard was never asleep', () => {
					// Arrange
					const guard = new GuardDetail(1);

					// Act
					const result = guard.mostFrequentMinuteAsleep;

					// Assert
					assert.equal(result, -1);
				});
			});
		});

		describe('getGuardDetails', () => {
			it('should parse the guard details from the guard event log', () => {
				// Arrange
				const input = `
					[2018-01-01 00:01] Guard #123 begins shift
					[2018-01-01 00:02] falls asleep
					[2018-01-01 00:03] wakes up
					[2018-01-01 00:05] falls asleep
					[2018-01-01 00:10] wakes up
					[2018-01-02 00:01] Guard #123 begins shift
					[2018-01-02 00:05] falls asleep
					[2018-01-02 00:06] wakes up
				`;

				// Act
				const guards = getGuardDetails(input);

				// Assert
				assert.isArray(guards);
				assert.equal(guards.length, 1);
				assert.equal(guards[0].id, 123);
				assert.equal(guards[0].totalMinutesAsleep, 7);
				assert.equal(guards[0].minutesAsleep.get(2), 1);
				assert.equal(guards[0].minutesAsleep.get(5), 2);
				assert.equal(guards[0].minutesAsleep.get(6), 1);
				assert.equal(guards[0].minutesAsleep.get(7), 1);
				assert.equal(guards[0].minutesAsleep.get(8), 1);
				assert.equal(guards[0].minutesAsleep.get(9), 1);
			});

			it('should handle multiple guards', () => {
				// Arrange
				const input = `
					[2018-01-01 00:01] Guard #123 begins shift
					[2018-01-02 00:01] Guard #456 begins shift
				`;

				// Act
				const guards = getGuardDetails(input);

				// Assert
				assert.equal(guards.length, 2);
				assert.equal(guards[0].id, 123);
				assert.equal(guards[1].id, 456);
			});

			it('should not set any minutes asleep if guard never slept', () => {
				// Arrange
				const input = `
					[2018-01-01 00:01] Guard #1 begins shift
				`;

				// Act
				const guards = getGuardDetails(input);

				// Assert
				assert.equal(guards[0].minutesAsleep.size, 0);
			});

			it('should sort events by timestamp', () => {
				// Arrange
				const input = `
					[2018-01-02 00:01] Guard #2 begins shift
					[2018-01-01 00:02] falls asleep
					[2018-01-01 00:03] wakes up
					[2018-01-01 00:01] Guard #1 begins shift
				`;

				// Act
				const guards = getGuardDetails(input);

				// Assert
				assert.equal(guards.length, 2);
				const guard1 = guards.find((g) => g.id === 1) as GuardDetail;
				const guard2 = guards.find((g) => g.id === 2) as GuardDetail;

				assert.equal(guard1.minutesAsleep.size, 1);
				assert.equal(guard1.minutesAsleep.get(2), 1);
				assert.equal(guard1.totalMinutesAsleep, 1);

				assert.equal(guard2.minutesAsleep.size, 0);
				assert.equal(guard2.totalMinutesAsleep, 0);
			});
		});

		it('should throw an error if the input is in an invalid format', () => {
			// Arrange
			const input = `
				[2018-01-01] Guard #1 begins shift
			`;

			// Act & Assert
			assert.throws(() => getGuardDetails(input));
		});

		it('should throw an error if the event is an unrecognized event', () => {
			// Arrange
			const input = `
				[2018-01-01 00:01] Guard #1 ends shift
			`;

			// Act & Assert
			assert.throws(() => getGuardDetails(input));
		});

		it('should ignore events that occur before the first shift start', () => {
			// Arrange
			const input = `
				[2018-01-01 00:01] falls asleep
				[2018-01-01 00:02] wakes up
				[2018-01-01 00:03] Guard #1 begins shift
			`;

			// Act
			const guards = getGuardDetails(input);

			// Assert
			assert.equal(guards.length, 1);
			assert.equal(guards[0].id, 1);
		});
	});

	describe('puzzle-01', () => {
		it('should return 240 for the example problem input', () => {
			// Arrange
			const input = `
				[1518-11-01 00:00] Guard #10 begins shift
				[1518-11-01 00:05] falls asleep
				[1518-11-01 00:25] wakes up
				[1518-11-01 00:30] falls asleep
				[1518-11-01 00:55] wakes up
				[1518-11-01 23:58] Guard #99 begins shift
				[1518-11-02 00:40] falls asleep
				[1518-11-02 00:50] wakes up
				[1518-11-03 00:05] Guard #10 begins shift
				[1518-11-03 00:24] falls asleep
				[1518-11-03 00:29] wakes up
				[1518-11-04 00:02] Guard #99 begins shift
				[1518-11-04 00:36] falls asleep
				[1518-11-04 00:46] wakes up
				[1518-11-05 00:03] Guard #99 begins shift
				[1518-11-05 00:45] falls asleep
				[1518-11-05 00:55] wakes up
			`;

			// Act
			const result = strategy1(input);

			// Assert
			assert.equal(result, 240);
		});

		it('should find guard with most sleeping minutes', () => {
			// Arrange
			const input = `
				[2018-01-01 00:01] Guard #1 begins shift
				[2018-01-01 00:02] falls asleep
				[2018-01-01 00:03] wakes up
				[2018-01-01 00:04] Guard #2 begins shift
				[2018-01-01 00:05] falls asleep
				[2018-01-01 00:07] wakes up
				[2018-01-01 00:08] Guard #3 begins shift
				[2018-01-01 00:09] falls asleep
				[2018-01-01 00:11] wakes up
				[2018-01-01 00:08] Guard #3 begins shift
				[2018-01-01 00:09] falls asleep
				[2018-01-01 00:10] wakes up
			`;

			// Act
			const result = strategy1(input);

			// Assert
			assert.equal(result, 27);
		});
	});

	describe('puzzle-02', () => {
		it('should return 4455 for the example problem input', () => {
			// Arrange
			const input = `
				[1518-11-01 00:00] Guard #10 begins shift
				[1518-11-01 00:05] falls asleep
				[1518-11-01 00:25] wakes up
				[1518-11-01 00:30] falls asleep
				[1518-11-01 00:55] wakes up
				[1518-11-01 23:58] Guard #99 begins shift
				[1518-11-02 00:40] falls asleep
				[1518-11-02 00:50] wakes up
				[1518-11-03 00:05] Guard #10 begins shift
				[1518-11-03 00:24] falls asleep
				[1518-11-03 00:29] wakes up
				[1518-11-04 00:02] Guard #99 begins shift
				[1518-11-04 00:36] falls asleep
				[1518-11-04 00:46] wakes up
				[1518-11-05 00:03] Guard #99 begins shift
				[1518-11-05 00:45] falls asleep
				[1518-11-05 00:55] wakes up
			`;

			// Act
			const result = strategy2(input);

			// Assert
			assert.equal(result, 4455);
		});

		it('should throw an exception if no guards were asleep', () => {
			// Arrange
			const input = `
				[2018-01-01 00:01] Guard #1 begins shift
				[2018-01-02 00:01] Guard #2 begins shift
			`;

			// Act & Assert
			assert.throws(() => strategy2(input));
		});
	});
});
