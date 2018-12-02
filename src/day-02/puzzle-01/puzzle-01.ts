import { parse } from '../lib/parser';

export function checksum(input: string): number {
	const boxIds = parse(input);
	let doubleCount = 0;
	let tripleCount = 0;

	for (const boxId of boxIds) {
		const characters = boxId.split('');

		if (characters.some((char) => characters.filter((c) => c === char).length === 2)) {
			doubleCount++;
		}

		if (characters.some((char) => characters.filter((c) => c === char).length === 3)) {
			tripleCount++;
		}
	}

	return doubleCount * tripleCount;
}
