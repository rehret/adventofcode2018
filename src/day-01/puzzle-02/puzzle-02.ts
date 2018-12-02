import { split } from '../lib/input-splitter';
import { parse } from '../lib/parser';

export function findDuplicateFrequency(input: string): number {
	const frequencyPattern = split(input.trim()).map((str) => parse(str));
	const previousFrequencies = new Set<number>();
	let duplicateFrequency: number | null = null;

	let frequencyDeltaIndex = 0;
	let frequency = 0;
	previousFrequencies.add(frequency);

	while (duplicateFrequency === null) {
		const frequencyDelta = frequencyPattern[frequencyDeltaIndex];

		frequency += frequencyDelta;
		if (previousFrequencies.has(frequency)) {
			duplicateFrequency = frequency;
		} else {
			previousFrequencies.add(frequency);
		}
		frequencyDeltaIndex = (frequencyDeltaIndex + 1) % frequencyPattern.length;
	}

	return duplicateFrequency;
}
