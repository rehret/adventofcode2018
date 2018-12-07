import { assert } from 'chai';
import { parse } from './lib/parser';
import { Coordinate } from './lib/coordinate';
import { getManhattanDistance, areaIsInfinite } from './lib/infinite-grid';
import { puzzle01 } from './puzzle-01';

describe('day-06', () => {
	describe('lib', () => {
		describe('parse', () => {
			it('should return coordinates from input', () => {
				// Arrange
				const input = `
					123, 456
					0, 1
					1, 0
				`;

				// Act
				const coords = parse(input);

				// Assert
				assert.isArray(coords);
				assert.equal(coords.length, 3);
				assert.deepEqual(coords[0], new Coordinate(123, 456));
				assert.deepEqual(coords[1], new Coordinate(0, 1));
				assert.deepEqual(coords[2], new Coordinate(1, 0));
			});

			[
				'123,456',
				'123',
				'123,abc',
				'123:456',
				'123 456'
			].forEach((testCase) => {
				it(`should throw an error if the input is not in an expected format (${testCase})`, () => {
					// Act & Assert
					assert.throws(() => parse(testCase));
				});
			});
		});

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

			it('should handle diagonal edge case', () => {
				// Edge case: Manhattan distance diagonally is the same as twice the diagonal height,
				// which isn't true using true distance.
				// In this test case, coordinate should be bounded, even though it wouldn't be if using true distance.

				// Arrange
				const coordinate = new Coordinate(0, 0);
				const bounds = [ coordinate, new Coordinate(2, 2), new Coordinate(2, -2), new Coordinate(-2, 2) ];

				// Act
				const result = areaIsInfinite(coordinate, bounds);

				// Assert
				assert.isFalse(result);
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
