import { parse } from '../lib/parser';

export function getFinalFrequency(input: string[]): number {
	return input.reduce((sum, val) => sum + parse(val), 0);
}
