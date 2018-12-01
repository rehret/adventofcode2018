import { parse } from '../lib/parser';

export function puzzle01(input: string[]): number {
	return input.reduce((sum, val) => sum + parse(val), 0);
}
