import { split } from '../lib/input-splitter';
import { parse } from '../lib/parser';

export function findDuplicateFrequency(input: string): number {
	const frequencyPattern = split(input.trim()).map((str) => parse(str));
	const previousFrequencies: number[] = [];
	let duplicateFrequency: number | null = null;

	let frequency = 0;
	previousFrequencies.push(frequency);

	while (duplicateFrequency === null) {
		const frequencyDelta = frequencyPattern.shift();
		if (frequencyDelta === undefined) {
			throw new Error('Input is empty');
		}

		frequency += frequencyDelta;
		if (previousFrequencies.includes(frequency)) {
			duplicateFrequency = frequency;
		} else {
			previousFrequencies.push(frequency);
		}
		frequencyPattern.push(frequencyDelta);
	}

	return duplicateFrequency;
}
