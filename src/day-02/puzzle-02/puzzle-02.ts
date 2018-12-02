import { parse } from '../lib/parser';

export function boxFinder(input: string): string {
	const boxIds = parse(input);
	const [ match1, match2 ] = boxIds.filter(getBoxFilter(boxIds));

	if (match1 === undefined || match2 === undefined || match1.length !== match2.length) {
		throw new Error('Could not find Box IDs differing by one character');
	}

	let result = '';
	for (let i = 0; i < match1.length; i++) {
		if (match1[i] === match2[i]) {
			result += match1[i];
		}
	}

	return result;
}

function getBoxFilter(boxIds: string[]): (boxId: string, index: number) => boolean {
	return (boxId: string, index: number) => {
		return boxIds.some(getBoxIdMatcher(boxId, index));
	};
}

function getBoxIdMatcher(startingBoxId: string, startingIndex: number): (boxId: string, index: number) => boolean {
	return (boxId: string, index: number) => {
		return startingIndex !== index &&
			getCharacterDifferences(startingBoxId, boxId) === 1;
	};
}

function getCharacterDifferences(boxId1: string, boxId2: string): number {
	return boxId1.split('').reduce((sum, char, charIndex) => char !== boxId2[charIndex] ? sum + 1 : sum, 0);
}
