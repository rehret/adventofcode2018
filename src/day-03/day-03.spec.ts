import { assert } from 'chai';
import { findFabricOverlaps } from './puzzle-01';

describe('day-03', () => {
	describe('lib', () => {
		// TODO: Implement lib tests
	});

	describe('puzzle-01', () => {
		it('should return 4 for example problem input', () => {
			// Arrange
			const input = '#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2';

			// Act
			const result = findFabricOverlaps(input);

			// Assert
			assert.equal(result, 4);
		});

		it('should not count an overlap again if that coordinate already has an overlap', () => {
			// Arrange
			const input = '#1 @ 1,1: 4x4\n#2 @ 2,2: 2x2\n#3 @ 3,3: 1x1';

			// Act
			const result = findFabricOverlaps(input);

			// Assert
			assert.equal(result, 4);
		});
	});
});
