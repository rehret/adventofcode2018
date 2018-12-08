import { Instruction } from '../lib/instruction';

export class Worker {
	public instruction: Instruction | null;
	public ready: boolean;
	public timeStarted: number;
	public taskLength: number;

	constructor() {
		this.instruction = null;
		this.ready = true;
		this.timeStarted = 0;
		this.taskLength = 0;
	}
}
