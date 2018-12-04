export class Event {
	public timestamp: Date;
	public message: string;

	constructor(timestamp: Date, message: string) {
		this.timestamp = timestamp;
		this.message = message;
	}
}
