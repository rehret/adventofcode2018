import { assert } from 'chai';
import { parse } from './lib/parser';
import { findFabricOverlaps } from './puzzle-01';
import { Coordinate } from './lib/coordinate';
import { FabricSection } from './lib/fabric-section';

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

		describe('Coordinate', () => {
			describe('constructor', () => {
				it('should assign properties x and y from constructor parameters', () => {
					// Arrange
					const inputX = 1;
					const inputY = 2;

					// Act
					const result = new Coordinate(inputX, inputY);

					// Assert
					assert.equal(result.x, inputX);
					assert.equal(result.y, inputY);
				});

				it('should use default value of 0 for x and y parameters', () => {
					// Act
					const result = new Coordinate();

					// Assert
					assert.equal(result.x, 0);
					assert.equal(result.y, 0);
				});
			});
		});

		describe('FabricSection', () => {
			describe('constructor', () => {
				it('should assign the start, width, and height properties from the constructor parameters', () => {
					// Arrange
					const inputX = 1;
					const inputY = 2;
					const inputWidth = 3;
					const inputHeight = 4;

					// Act
					const result = new FabricSection(inputX, inputY, inputWidth, inputHeight);

					// Assert
					assert.equal(result.start.x, inputX);
					assert.equal(result.start.y, inputY);
					assert.equal(result.width, inputWidth);
					assert.equal(result.height, inputHeight);
				});
			});

			describe('end property', () => {
				it('should be computed rom start, width, and height', () => {
					// Arrange
					const section = new FabricSection(1, 1, 2, 3);

					// Act
					const endCoord = section.end;

					// Assert
					assert.equal(endCoord.x, 2);
					assert.equal(endCoord.y, 3);
				});
			});

			describe('HasOverlap', () => {
				it('should return true if there is an overlap', () => {
					// Arrange
					const section = new FabricSection(1, 1, 3, 3);

					// Act
					const result = section.HasOverlap(new FabricSection(2, 2, 1, 1));

					// Assert
					assert.isTrue(result);
				});

				it('should return false if there is no overlap', () => {
					// Arrange
					const section = new FabricSection(1, 1, 3, 3);

					// Act
					const result = section.HasOverlap(new FabricSection(4, 4, 1, 1));

					// Assert
					assert.isFalse(result);
				});

				it('should return true if second section is entirely inside the first', () => {
					// Arrange
					const section = new FabricSection(1, 1, 4, 4);

					// Act
					const result = section.HasOverlap(new FabricSection(2, 2, 2, 2));

					// Assert
					assert.isTrue(result);
				});

				it('should return true if the first section is entirely inside the second', () => {
					// Arrange
					const section = new FabricSection(2, 2, 2, 2);

					// Act
					const result = new FabricSection(1, 1, 4, 4).HasOverlap(section);

					// Assert
					assert.isTrue(result);
				});
			});

			describe('GetOverlapCoordinates', () => {
				it('should return overlapped coordinates', () => {
					// Arrange
					const section = new FabricSection(1, 1, 2, 2);

					// Act
					const result = section.GetOverlapCoordinates(new FabricSection(2, 2, 1, 1));

					// Assert
					assert.equal(result.length, 1);
					assert.equal(result[0].x, 2);
					assert.equal(result[0].y, 2);
				});

				it('should return an empty array if there is no overlap', () => {
					// Arrange
					const section = new FabricSection(1, 1, 2, 2);

					// Act
					const result = section.GetOverlapCoordinates(new FabricSection(3, 3, 1, 1));

					// Assert
					assert.equal(result.length, 0);
				});

				it('should return correct coordinates if two sections are exactly the same', () => {
					// Arrange
					const section = new FabricSection(1, 1, 3, 3);

					// Act
					const result = section.GetOverlapCoordinates(new FabricSection(1, 1, 3, 3));

					// Assert
					assert.equal(result.length, 9);
					for (let y = 1; y <= 3; y++) {
						for (let x = 1; x <= 3; x++) {
							assert.isTrue(result.some((coord) => coord.x === x && coord.y === y));
						}
					}
				});

				it('should return inner section if one section is inside the other', () => {
					// Arrange
					const test1 = new FabricSection(1, 1, 4, 4);
					const test2 = new FabricSection(2, 2, 2, 2);

					// Act
					const result1 = test1.GetOverlapCoordinates(new FabricSection(2, 2, 2, 2));
					const result2 = test2.GetOverlapCoordinates(new FabricSection(1, 1, 4, 4));

					// Assert
					assert.equal(result1.length, 4);
					assert.equal(result2.length, 4);

					for (let y = 2; y <= 3; y++) {
						for (let x = 2; x <= 3; x++) {
							assert.isTrue(result1.some((coord) => coord.x === x && coord.y === y));
							assert.isTrue(result2.some((coord) => coord.x === x && coord.y === y));
						}
					}
				});

				it('should return intersection for T-shaped intersections', () => {
					// Arrange
					const section1 = new FabricSection(3, 1, 1, 5);
					const section2 = new FabricSection(1, 3, 5, 1);

					// Act
					const result = section1.GetOverlapCoordinates(section2);

					// Assert
					assert.equal(result.length, 1);
					assert.equal(result[0].x, 3);
					assert.equal(result[0].y, 3);
				});
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
