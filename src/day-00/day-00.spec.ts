import { assert } from 'chai';
import { puzzle01 } from './puzzle-01';
import { puzzle02 } from './puzzle-02';

describe('day-00', () => {
	describe('puzzle-01', () => {
		it('should return true', () => {
			assert.isTrue(puzzle01());
		});
	});

	describe('puzzle-02', () => {
		it('should return false', () => {
			assert.isFalse(puzzle02());
		});
	});
});
