import { parse } from '../lib/parser';
import { Instruction } from '../lib/instruction';
import { Worker } from './worker';

export function getParallelExecutionTime(input: string, numberOfWorkers: number = 5, baseExecutionTime: number = 60): number {
	const instructions = parse(input).sort((a, b) => a.step.localeCompare(b.step));

	const workers: Worker[] = [];
	for (let i = 0; i < numberOfWorkers; i++) {
		workers.push(new Worker());
	}

	const completedInstructions: Set<string> = new Set();
	let time = -1;

	while (!instructions.every((i) => completedInstructions.has(i.step))) {
		time++;
		for (const worker of workers) {
			if (!worker.ready && worker.timeStarted + worker.taskLength === time) {
				completedInstructions.add((worker.instruction as Instruction).step);
				worker.instruction = null;
				worker.timeStarted = 0;
				worker.taskLength = 0;
				worker.ready = true;
			}
		}

		const readyWorkers = workers.filter((w) => w.ready);
		if (readyWorkers.length > 0) {
			const inProgressInstructions = new Set(workers.filter((w) => !w.ready).map((w) => (w.instruction as Instruction).step));
			const readyInstructions = getReadyInstructions(instructions, completedInstructions, inProgressInstructions);
			for (const readyWorker of readyWorkers) {
				if (readyInstructions.length > 0) {
					const instruction = readyInstructions.shift() as Instruction;
					readyWorker.instruction = instruction;
					readyWorker.timeStarted = time;
					readyWorker.taskLength = getExecutionTime(readyWorker.instruction, baseExecutionTime);
					readyWorker.ready = false;
				}
			}
		}
	}

	return time;
}

function getExecutionTime(instruction: Instruction, baseExecutionTime: number): number {
	const base = 'A'.charCodeAt(0);
	return baseExecutionTime + (instruction.step.charCodeAt(0) - base) + 1;
}

function getReadyInstructions(instructions: Instruction[], completed: Set<string>, inProgress: Set<string>): Instruction[] {
	return instructions
		.filter((i) => !completed.has(i.step) && !inProgress.has(i.step) && i.prerequisites.every((prerequisite) => completed.has(prerequisite)));
}
