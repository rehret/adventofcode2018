import { assert } from 'chai';
import { parse } from './lib/parser';
import { getFinalPolymer } from './lib/polymer-reducer';
import { getResultingPolymerLength } from './puzzle-01';
import { getOptimalPolymerLength } from './puzzle-02';

describe('day-05', () => {
	describe('lib', () => {
		describe('parse', () => {
			it('should split input into separate characters', () => {
				// Arrange
				const input = 'abcdefg';

				// Act
				const result = parse(input);

				// Assert
				assert.isArray(result);
				assert.equal(result.length, 7);
				assert.deepEqual(result, ['a', 'b', 'c', 'd', 'e', 'f', 'g']);
			});

			it('should trim whitespace from the input', () => {
				// Arrange
				const input = '\n\n\nabc\n\n\n';

				// Act
				const result = parse(input);

				// Assert
				assert.equal(result.length, 3);
			});
		});

		describe('getFinalPolymer', () => {
			it('should return source polymer if there are no reactions', () => {
				// Arrange
				const input = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

				// Act
				const result = getFinalPolymer(input);

				// Assert
				assert.deepEqual(result, ['a', 'b', 'c', 'd', 'e', 'f', 'g']);
			});

			it('should react adjacent inverse units', () => {
				// Arrange
				const input = ['a', 'b', 'B', 'c'];

				// Act
				const result = getFinalPolymer(input);

				// Assert
				assert.deepEqual(result, ['a', 'c']);
			});

			it('should return an empty array if all units react', () => {
				// Arrange
				const input = ['a', 'A', 'b', 'B'];

				// Act
				const result = getFinalPolymer(input);

				// Assert
				assert.equal(result.length, 0);
			});

			it('should perform reactions that require other reactions to occur first', () => {
				// Arrange
				const input = ['a', 'b', 'c', 'C', 'B', 'd'];

				// Act
				const result = getFinalPolymer(input);

				// Assert
				assert.deepEqual(result, ['a', 'd']);
			});
		});
	});

	describe('puzzle-01', () => {
		it('should return 10 for the example problem input', () => {
			// Arrange
			const input = 'dabAcCaCBAcCcaDA';

			// Act
			const result = getResultingPolymerLength(input);

			// Assert
			assert.equal(result, 10);
		});
	});

	describe('puzzle-02', () => {
		it('should return 4 for the example problem input', () => {
			// Arrange
			const input = 'dabAcCaCBAcCcaDA';

			// Act
			const result = getOptimalPolymerLength(input);

			// Assert
			assert.equal(result, 4);
		});
	});
});
