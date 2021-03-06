import { assert } from 'chai';
import { parse } from './lib/parser';
import { Instruction } from './lib/instruction';
import { getInstructionOrder } from './puzzle-01';
import { getParallelExecutionTime } from './puzzle-02';

describe('day-07', () => {
	describe('lib', () => {
		describe('parse', () => {
			it('should build array of instructions from input', () => {
				// Arrange
				const input = `
					Step A must be finished before step C can begin.
					Step B must be finished before step C can begin.
				`;

				// Act
				const result = parse(input);

				// Assert
				assert.isArray(result);
				assert.equal(result.length, 3);
				['A', 'B', 'C'].forEach((step) => assert.isTrue(result.some((instruction) => instruction.step === step)));
			});

			it('should assign prerequisites to each instruction instance', () => {
				// Arrange
				const input = `
					Step A must be finished before step C can begin.
					Step B must be finished before step C can begin.
				`;

				// Act
				const result = parse(input);

				// Assert
				const instructionC = result.find((instruction) => instruction.step === 'C') as Instruction;
				assert.equal(instructionC.prerequisites.length, 2);
				assert.isTrue(instructionC.prerequisites.some((p) => p === 'A'));
				assert.isTrue(instructionC.prerequisites.some((p) => p === 'B'));
			});

			it('should throw an error if input is in an unexpected format', () => {
				// Arrange
				const input = `
					Step A must be finished before step C can begin.
					Step B must be finished before step C can begin.
					Step D can begin.
				`;

				// Act & Assert
				assert.throws(() => parse(input));
			});
		});

		describe('Instruction', () => {
			describe('constructor', () => {
				it('should assign step label from constructor parameter', () => {
					// Arrange
					const inputStep = 'A';

					// Act
					const instruction = new Instruction(inputStep);

					// Assert
					assert.equal(instruction.step, inputStep);
				});

				it('should initialize prerequisites to an empty array', () => {
					// Act
					const instruction = new Instruction('A');

					// Assert
					assert.isArray(instruction.prerequisites);
					assert.equal(instruction.prerequisites.length, 0);
				});
			});
		});
	});

	describe('puzzle-01', () => {
		it('should return "CABDFE" for the example problem input', () => {
			// Arrange
			const input = `
				Step C must be finished before step A can begin.
				Step C must be finished before step F can begin.
				Step A must be finished before step B can begin.
				Step A must be finished before step D can begin.
				Step B must be finished before step E can begin.
				Step D must be finished before step E can begin.
				Step F must be finished before step E can begin.
			`;

			// Act
			const result = getInstructionOrder(input);

			// Assert
			assert.equal(result, 'CABDFE');
		});
	});

	describe('puzzle-02', () => {
		it('should return 15 for example problem input', () => {
			// Arrange
			const input = `
				Step C must be finished before step A can begin.
				Step C must be finished before step F can begin.
				Step A must be finished before step B can begin.
				Step A must be finished before step D can begin.
				Step B must be finished before step E can begin.
				Step D must be finished before step E can begin.
				Step F must be finished before step E can begin.
			`;

			// Act
			const result = getParallelExecutionTime(input, 2, 0);

			// Assert
			assert.equal(result, 15);
		});

		it('should default number of workers to 5 and base execution time to 60', () => {
			// Arrange
			const input = `
				Step A must be finished before step F can begin.
				Step B must be finished before step F can begin.
				Step C must be finished before step F can begin.
				Step D must be finished before step F can begin.
				Step E must be finished before step F can begin.
			`;

			// Act
			const result = getParallelExecutionTime(input);

			// Assert
			// Step E is the bottleneck. As soon as E is finished, F can begin.
			// So execution time is E + F, or (60 + 5) + (60 + 6)
			assert.equal(result, 131);
		});
	});
});
