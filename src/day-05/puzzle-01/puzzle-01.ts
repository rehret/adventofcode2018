import { parse } from '../lib/parser';
import { getFinalPolymer } from '../lib/polymer-reducer';

export function getResultingPolymerLength(input: string): number {
	const polymer = getFinalPolymer(parse(input));
	return polymer.length;
}
