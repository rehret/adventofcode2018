export class Instruction {
	public step: string;
	public prerequisites: string[];

	constructor(step: string) {
		this.step = step;
		this.prerequisites = [];
	}
}
