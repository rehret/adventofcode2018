import { assert } from 'chai';
import { Coordinate } from './lib/coordinate';
import { getManhattanDistance, areaIsInfinite } from './lib/infinite-grid';
import { puzzle01 } from './puzzle-01';

describe('day-06', () => {
	describe('lib', () => {
		describe('Coordinate', () => {
			describe('constructor', () => {
				it('should assign properties from constructor parameters', () => {
					// Arrange
					const inputX = 1;
					const inputY = 2;

					// Act
					const coordinate = new Coordinate(inputX, inputY);

					// Assert
					assert.equal(coordinate.x, inputX);
					assert.equal(coordinate.y, inputY);
				});
			});

			describe('toString', () => {
				it('should return coordinate as a string', () => {
					// Arrange
					const coordinate = new Coordinate(2, 3);

					// Act
					const result = coordinate.toString();

					// Assert
					assert.isString(result);
					assert.equal(result, '2,3');
				});
			});
		});

		describe('getManhattanDistance', () => {
			it('should return the Manhattan distance between two points', () => {
				// Arrange
				const c1 = new Coordinate(0, 0);
				const c2 = new Coordinate(2, 3);

				// Act
				const result = getManhattanDistance(c1, c2);

				// Assert
				assert.equal(result, 5);
			});

			it('should properly handle coordinates with negative components', () => {
				// Arrange
				const c1 = new Coordinate(-1, -2);
				const c2 = new Coordinate(1, 2);

				// Act
				const result = getManhattanDistance(c1, c2);

				// Assert
				assert.equal(result, 6);
			});
		});

		describe('areaIsInfinite', () => {
			it('should return false for bounded coordinates', () => {
				// Arrange
				const coordinate = new Coordinate(0, 0);
				const bounds = [ coordinate, new Coordinate(2, 0), new Coordinate(-2, 0), new Coordinate(0, 2), new Coordinate(0, -2) ];

				// Act
				const result = areaIsInfinite(coordinate, bounds);

				// Assert
				assert.isFalse(result);
			});

			it('should return true for unbounded coordinates', () => {
				// Arrange
				const coordinate = new Coordinate(0, 0);
				const bounds = [ coordinate, new Coordinate(2, 0), new Coordinate(-2, 0), new Coordinate(0, 2) ];

				// Act
				const result = areaIsInfinite(coordinate, bounds);

				// Assert
				assert.isTrue(result);
			});

			it('should handle a coordinate being bound diagonally', () => {
				// Arrange
				const coordinate = new Coordinate(0, 0);
				const bounds = [ coordinate, new Coordinate(2, 2), new Coordinate(2, -2), new Coordinate(-2, 2), new Coordinate(-2, -2) ];

				// Act
				const result = areaIsInfinite(coordinate, bounds);

				// Assert
				assert.isFalse(result);
			});

			it('should handle a coordinate being unbounded diagonally', () => {
				// Arrange
				const coordinate = new Coordinate(0, 0);
				const bounds = [ coordinate, new Coordinate(2, 2), new Coordinate(2, -2), new Coordinate(-2, 2) ];

				// Act
				const result = areaIsInfinite(coordinate, bounds);

				// Assert
				assert.isTrue(result);
			});
		});
	});

	describe('puzzle-01', () => {
		it('should return 17 for the example problem input', () => {
			// Arrange
			const input = `
				1, 1
				1, 6
				8, 3
				3, 4
				5, 5
				8, 9
			`;

			// Act
			const result = puzzle01(input);

			// Assert
			assert.equal(result, 17);
		});
	});
});
