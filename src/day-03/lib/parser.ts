import { FabricSection } from './fabric-section';

const inputRegex = /^#\d+\s+@\s+(\d+),(\d+):\s+(\d+)x(\d+)/;

export function parse(input: string): FabricSection[] {
	const lines = input.trim().split(/\n/);
	return lines.map((line) => {
		const matches = line.trim().match(inputRegex);
		if (matches !== null) {
			const matchGroups = matches.slice(1).map((val) => parseInt(val));
			return new FabricSection(matchGroups[0], matchGroups[1], matchGroups[2], matchGroups[3]);
		} else {
			throw new Error('Invalid input format');
		}
	});
}
