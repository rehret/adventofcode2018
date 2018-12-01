import { split } from '../lib/input-splitter';
import { parse } from '../lib/parser';

export function findDuplicateFrequency(input: string): number {
	const frequencyPattern = split(input.trim()).map((str) => parse(str));
	const previousFrequencies: number[] = [];
	let duplicateFrequency: number | null = null;

	let frequencyDeltaIndex = 0;
	let frequency = 0;
	previousFrequencies.push(frequency);

	while (duplicateFrequency === null) {
		const frequencyDelta = frequencyPattern[frequencyDeltaIndex];

		frequency += frequencyDelta;
		if (previousFrequencies.includes(frequency)) {
			duplicateFrequency = frequency;
		} else {
			previousFrequencies.push(frequency);
		}
		frequencyDeltaIndex = (frequencyDeltaIndex + 1) % frequencyPattern.length;
	}

	return duplicateFrequency;
}
