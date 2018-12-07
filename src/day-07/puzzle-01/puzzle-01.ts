import { parse } from '../lib/parser';
import { Instruction } from '../lib/instruction';

export function puzzle01(input: string): string {
	const instructions = parse(input).sort((a, b) => a.step.localeCompare(b.step));
	const completedInstructions: Set<string> = new Set();

	let next = getNextInstruction(instructions, completedInstructions);
	while (next !== undefined) {
		completedInstructions.add(next.step);
		next = getNextInstruction(instructions, completedInstructions);
	}

	return Array.from(completedInstructions.values()).join('');
}

/**
 * Gets the next instruction to execute. Assumes the instructions are sorted by step label.
 * @param instructions
 * @param completed
 */
function getNextInstruction(instructions: Instruction[], completed: Set<string>): Instruction | undefined {
	return instructions
		.find((i) => !completed.has(i.step) && i.prerequisites.every((prerequisite) => completed.has(prerequisite)));
}
