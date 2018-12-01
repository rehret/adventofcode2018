import { assert } from 'chai';
import { parse } from './lib/parser';
import { split } from './lib/input-splitter';
import { puzzle01 } from './puzzle-01';

describe('day-01', () => {
	describe('lib', () => {
		describe('parse', () => {
			[
				{ input: '+1', expected: 1 },
				{ input: '-3', expected: -3 },
				{ input: '+10', expected: 10 }
			].forEach((testCase) => {
				it(`should parse "${testCase.input}" as ${testCase.expected}`, () => {
					// Arrange
					const input = testCase.input;

					// Act
					const result = parse(input);

					// Assert
					assert.equal(result, testCase.expected);
				});
			});

			it('should throw an error when the input is NaN', () => {
				// Arrange
				const input = '-f123';

				// Act & Assert
				assert.throws(() => parse(input));
			});
		});

		describe('split', () => {
			[
				{ input: 'a, b, c', expected: ['a', 'b', 'c'] },
				{ input: 'a,   b,   c', expected: ['a', 'b', 'c'] },
				{ input: '+1, -2, +3', expected: ['+1', '-2', '+3'] },
				{ input: 'a,\nb,\nc', expected: ['a', 'b', 'c'] },
				{ input: 'a\nb\nc', expected: ['a', 'b', 'c'] }
			].forEach((testCase) => {
				it(`should split based on optional comma and required whitespace ("${testCase.input}")`, () => {
					// Arrange
					const input = testCase.input;

					// Act
					const result = split(input);

					// Assert
					assert.deepEqual(result, testCase.expected);
				});
			});
		});
	});

	describe('puzzle-01', () => {
		it('should return 3 given example problem input', () => {
			// Arrange
			const input = ['+1', '-2', '+3', '+1'];

			// Act
			const result = puzzle01(input);

			// Assert
			assert.equal(result, 3);
		});

		[
			{ input: '+1, +1, +1', expected: 3 },
			{ input: '+1, +1, -2', expected: 0 },
			{ input: '-1, -2, -3', expected: -6 }
		].forEach((testCase) => {
			it(`should return ${testCase.expected} given the input "${testCase.input}"`, () => {
				// Arrange
				const input = testCase.input;

				// Act
				const result = puzzle01(split(input));

				// Assert
				assert.equal(result, testCase.expected);
			});
		});
	});
});
