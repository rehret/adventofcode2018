import { split } from '../lib/input-splitter';
import { parse } from '../lib/parser';

export function getFinalFrequency(input: string): number {
	return split(input.trim()).reduce((sum, val) => sum + parse(val), 0);
}
