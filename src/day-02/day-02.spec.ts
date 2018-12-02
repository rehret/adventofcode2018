import { assert } from 'chai';
import { parse } from './lib/parser';
import { checksum } from './puzzle-01';
import { boxFinder } from './puzzle-02';

describe('day-02', () => {
	describe('lib', () => {
		describe('parse', () => {
			it('should split on whitespace', () => {
				// Arrange
				const input = 'a\nb\nc';

				// Act
				const result = parse(input);

				// Assert
				assert.deepEqual(result, ['a', 'b', 'c']);
			});

			it('should trim trailing whitespace', () => {
				// Arrange
				const input = 'a\nb\nc\n\n\n';

				// Act
				const result = parse(input);

				// Assert
				assert.deepEqual(result, ['a', 'b', 'c']);
			});

			it('should trim leading whitespace', () => {
				// Arrange
				const input = '\n\n\na\nb\nc';

				// Act
				const result = parse(input);

				// Assert
				assert.deepEqual(result, ['a', 'b', 'c']);
			});
		});
	});

	describe('puzzle-01', () => {
		it('should return 12 for the example problem input', () => {
			// Arrange
			const input = 'abcdef\nbababc\nabbcde\nabcccd\naabcdd\nabcdee\nababab';

			// Act
			const result = checksum(input);

			// Assert
			assert.equal(result, 12);
		});

		it('should return 0 if there are no duplicates', () => {
			// Arrange
			const input = 'abcde';

			// Act
			const result = checksum(input);

			// Assert
			assert.equal(result, 0);
		});

		it('should return 1 if there is both a double and triple occurrance', () => {
			// Arrange
			const input = 'aabbb';

			// Act
			const result = checksum(input);

			// Assert
			assert.equal(result, 1);
		});
	});

	describe('puzzle-02', () => {
		it('should return "fgij" for the example problem input', () => {
			// Arrange
			const input = 'abcde\nfghij\nklmno\npqrst\nfguij\naxcye\nwvxyz';

			// Act
			const result = boxFinder(input);

			// Assert
			assert.equal(result, 'fgij');
		});

		it('should throw an error if there are no Box IDs that differ by one character', () => {
			// Arrange
			const input = 'abcde\nfghij';

			// Act & Assert
			assert.throws(() => boxFinder(input));
		});
	});
});
