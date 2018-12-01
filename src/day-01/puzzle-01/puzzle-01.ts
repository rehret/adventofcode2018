import { split } from '../lib/input-splitter';
import { parse } from '../lib/parser';

export function getFinalFrequency(input: string): number {
	if (input.trim().length === 0) {
		throw new Error('Input is empty');
	}

	return split(input.trim()).reduce((sum, val) => sum + parse(val), 0);
}
