export class GuardDetail {
	public id: number;
	public minutesAsleep: Map<number, number>;

	constructor(id: number) {
		this.id = id;
		this.minutesAsleep = new Map<number, number>();
	}

	public get totalMinutesAsleep(): number {
		return Array.from(this.minutesAsleep.values()).reduce((sum, timesAsleep) => sum + timesAsleep, 0);
	}

	public get mostFrequentMinuteAsleep(): number {
		const occurrances = Array.from(this.minutesAsleep.entries())
			.map((keyValueArray) => ({ minute: keyValueArray[0], occurances: keyValueArray[1] }));

		if (occurrances.length === 0) {
			return -1;
		}

		return occurrances.reduce((mostFrequent, minute) => {
			return minute.occurances > mostFrequent.occurances ? minute : mostFrequent;
		}, occurrances[0]).minute;
	}
}
