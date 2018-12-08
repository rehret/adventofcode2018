import { assert } from 'chai';
import { Node } from './lib/node';
import { parse } from './lib/parser';
import { getSumOfMetadata } from './puzzle-01';
import { getComplexMetadataSum } from './puzzle-02/puzzle-02';

describe('day-08', () => {
	describe('lib', () => {
		describe('Node', () => {
			describe('constructor', () => {
				it('should initialize numChildren and numMetadata properties from constructor parameters', () => {
					// Arrange
					const inputNumChildren = 2;
					const inputNumMetadata = 3;

					// Act
					const node = new Node(inputNumChildren, inputNumMetadata);

					// Assert
					assert.equal(node.numChildren, inputNumChildren);
					assert.equal(node.numMetadata, inputNumMetadata);
				});

				it('should initialize parent, children, and metadata properties', () => {
					// Act
					const node = new Node(0, 0);

					// Assert
					assert.isNull(node.parent);
					assert.isArray(node.children);
					assert.equal(node.children.length, 0);
					assert.isArray(node.metadata);
					assert.equal(node.metadata.length, 0);
				});
			});
		});

		describe('parse', () => {
			it('should parse node metadata from input', () => {
				// Arrange
				const input = '0 3 1 2 3';

				// Act
				const node = parse(input);

				// Assert
				assert.equal(node.metadata.length, 3);
				assert.deepEqual(node.metadata, [1, 2, 3]);
			});

			it('should parse node children from input', () => {
				// Arrange
				const input = '1 0 0 3 1 2 3';

				// Act
				const node = parse(input);

				// Assert
				assert.equal(node.children.length, 1);
				const child = node.children[0];
				assert.equal(child.children.length, 0);
				assert.equal(child.metadata.length, 3);
				assert.deepEqual(child.metadata, [1, 2, 3]);
			});

			it('should trim whitespace from the input', () => {
				// Arrange
				const input = '\n\n\n0 3 1 2 3\n\n\n';

				// Act
				const node = parse(input);

				// Assert
				assert.equal(node.children.length, 0);
				assert.equal(node.metadata.length, 3);
				assert.deepEqual(node.metadata, [1, 2, 3]);
			});

			it('should throw an error if there is not at least one node definition in the input', () => {
				// Arrange
				const input = '1';

				// Act & Assert
				assert.throws(() => parse(input));
			});

			it('should throw an error if any input value is not a number', () => {
				// Arrange
				const input = '0 3 1 A 3';

				// Act & Assert
				assert.throws(() => parse(input));
			});
		});
	});

	describe('puzzle-01', () => {
		it('should return 138 for example problem input', () => {
			// Arrange
			const input = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';

			// Act
			const result = getSumOfMetadata(input);

			// Assert
			assert.equal(result, 138);
		});
	});

	describe('puzzle-02', () => {
		it('should return 66 for example problem input', () => {
			// Arrange
			const input = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';

			// Act
			const result = getComplexMetadataSum(input);

			// Assert
			assert.equal(result, 66);
		});
	});
});
