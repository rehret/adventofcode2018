import { parse } from '../lib/parser';

export function findFabricOverlaps(input: string): number {
	const fabricSections = parse(input);
	let areaSum = 0;

	for (let i = 0; i < fabricSections.length - 1; i++) {
		for (let j = i + 1; j < fabricSections.length; j++) {
			areaSum += fabricSections[i].GetOverlapArea(fabricSections[j]);
		}
	}

	return areaSum;
}
