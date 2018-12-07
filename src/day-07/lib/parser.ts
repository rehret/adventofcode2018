import { Instruction } from './instruction';

const lineRegex = /^Step (\w) must be finished before step (\w) can begin.$/;

export function parse(input: string): Instruction[] {
	const instructions: Map<string, Instruction> = new Map();
	const lines = input.trim().split(/\n/);

	for (const line of lines) {
		const matches = line.trim().match(lineRegex);

		if (matches === null) {
			throw new Error('Input string in incorrect format');
		}

		const instruction1 = instructions.get(matches[1]) || new Instruction(matches[1]);
		const instruction2 = instructions.get(matches[2]) || new Instruction(matches[2]);

		instruction2.prerequisites.push(instruction1.step);

		if (!instructions.has(instruction1.step)) {
			instructions.set(instruction1.step, instruction1);
		}

		if (!instructions.has(instruction2.step)) {
			instructions.set(instruction2.step, instruction2);
		}
	}

	return Array.from(instructions.values());
}
