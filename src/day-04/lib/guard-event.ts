export class GuardEvent {
	public timestamp: Date;
	public guardId: number;
	public eventType: GuardEventType;

	constructor(timestamp: Date, guardId: number, eventType: GuardEventType) {
		this.timestamp = timestamp;
		this.guardId = guardId;
		this.eventType = eventType;
	}
}

export enum GuardEventType {
	BeginShift,
	WakeUp,
	FallAsleep
}
