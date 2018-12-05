import { parse } from '../lib/parser';
import { getFinalPolymer } from '../lib/polymer-reducer';

export function getOptimalPolymerLength(input: string): number {
	const polymer = parse(input);
	const optimalPolymer = getAlphabetArray()
		.map((letter) => polymer.join('').replace(new RegExp(letter, 'gi'), '').split(''))
		.reduce((optimal, filteredPolymer) => {
			const finalFilteredPolymer = getFinalPolymer(filteredPolymer);
			return finalFilteredPolymer.length < optimal.length ? finalFilteredPolymer : optimal;
		});

	return optimalPolymer.length;
}

function getAlphabetArray(): string[] {
	const start = 'a';
	const end = 'z';
	const alphabet: string[] = [];

	for (let i = start.charCodeAt(0); i <= end.charCodeAt(0); i++) {
		alphabet.push(String.fromCharCode(i));
	}

	return alphabet;
}
