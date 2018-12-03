import { assert } from 'chai';
import { parse } from './lib/parser';
import { findFabricOverlaps } from './puzzle-01';

describe('day-03', () => {
	describe('lib', () => {
		describe('parse', () => {
			it('should correctly match start coordinate, width, and height', () => {
				// Arrange
				const input = '#1 @ 1,2: 3x4';

				// Act
				const result = parse(input);

				// Assert
				assert.equal(result.length, 1);
				assert.equal(result[0].start.x, 1);
				assert.equal(result[0].start.y, 2);
				assert.equal(result[0].width, 3);
				assert.equal(result[0].height, 4);
			});

			it('should split input on newlines', () => {
				// Arrange
				const input = '#1 @ 1,1: 2x2\n#2 @ 2,2: 3x3';

				// Act
				const result = parse(input);

				// Assert
				assert.equal(result.length, 2);

				assert.equal(result[0].start.x, 1);
				assert.equal(result[0].start.y, 1);
				assert.equal(result[0].width, 2);
				assert.equal(result[0].height, 2);

				assert.equal(result[1].start.x, 2);
				assert.equal(result[1].start.y, 2);
				assert.equal(result[1].width, 3);
				assert.equal(result[1].height, 3);
			});

			it('should throw an error if input is in an invalid format', () => {
				// Arrange
				const input = '#1 @ 1,1: 2,2';

				// Act & Assert
				assert.throws(() => parse(input));
			});

			it('should trim extra newlines from the end of the input', () => {
				// Arrange
				const input = '#1 @ 1,1: 2x2\n\n\n';

				// Act
				const result = parse(input);

				// Assert
				assert.equal(result.length, 1);
			});

			it('should trim extra newline from the start of the input', () => {
				// Arrange
				const input = '\n\n\n#1 @ 1,1: 2x2';

				// Act
				const result = parse(input);

				// Assert
				assert.equal(result.length, 1);
			});

			it('should trim extra spaces around each line of input', () => {
				// Arrange
				const input = '#1 @ 1,1: 2x2\n   #2 @ 2,2: 3x3   \n#3 @ 0,0: 4x4';

				// Act
				const result = parse(input);

				// Assert
				assert.equal(result.length, 3);
				assert.equal(result[1].start.x, 2);
				assert.equal(result[1].start.y, 2);
				assert.equal(result[1].width, 3);
				assert.equal(result[1].height, 3);
			});
		});
	});

	describe('puzzle-01', () => {
		it('should return 4 for example problem input', () => {
			// Arrange
			const input = `
				#1 @ 1,3: 4x4
				#2 @ 3,1: 4x4
				#3 @ 5,5: 2x2
			`;

			// Act
			const result = findFabricOverlaps(input);

			// Assert
			assert.equal(result, 4);
		});

		it('should not count an overlap again if that coordinate already has an overlap', () => {
			// Arrange
			const input = `
				#1 @ 1,1: 4x4
				#2 @ 2,2: 2x2
				#3 @ 3,3: 1x1
			`;

			// Act
			const result = findFabricOverlaps(input);

			// Assert
			assert.equal(result, 4);
		});

		it('should return 0 if there are no overlaps', () => {
			// Arrange
			const input = `
				#1 @ 1,1: 2x2
				#2 @ 3,3: 2x2
			`;

			// Act
			const result = findFabricOverlaps(input);

			// Assert
			assert.equal(result, 0);
		});
	});
});
