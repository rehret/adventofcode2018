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
}
