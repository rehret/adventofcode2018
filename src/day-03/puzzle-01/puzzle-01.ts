import { parse } from '../lib/parser';
import { Coordinate } from '../lib/coordinate';

export function findFabricOverlaps(input: string): number {
	const fabricSections = parse(input);
	const totalOverlap: Coordinate[] = [];

	for (let i = 0; i < fabricSections.length - 1; i++) {
		for (let j = i + 1; j < fabricSections.length; j++) {
			const overlap = fabricSections[i].GetOverlapCoordinates(fabricSections[j]);
			overlap
				.filter((c) => !totalOverlap.some((o) => o.x === c.x && o.y === c.y))
				.forEach((c) => totalOverlap.push(c));
		}
	}

	return totalOverlap.length;
}
