import { parse } from '../lib/parser';
import { findOverlapCoordinates } from '../lib/overlap';

export function findFabricOverlaps(input: string): number {
	const fabricSections = parse(input);
	const overlapCoords = findOverlapCoordinates(fabricSections);

	return overlapCoords.length;
}
