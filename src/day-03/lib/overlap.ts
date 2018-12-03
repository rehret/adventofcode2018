import { Coordinate } from './coordinate';
import { FabricSection } from './fabric-section';

export function findOverlapCoordinates(fabricSections: FabricSection[]): Coordinate[] {
	const previousOverlaps = new Set<string>();
	const uniqueOverlapCoords: Coordinate[] = [];

	for (let i = 0; i < fabricSections.length - 1; i++) {
		for (let j = i + 1; j < fabricSections.length; j++) {
			const overlapCoords = fabricSections[i].GetOverlapCoordinates(fabricSections[j]);

			for (const overlap of overlapCoords) {
				if (!previousOverlaps.has(coordToString(overlap))) {
					uniqueOverlapCoords.push(overlap);
					previousOverlaps.add(coordToString(overlap));
				}
			}
		}
	}

	return uniqueOverlapCoords;
}

function coordToString(coord: Coordinate): string {
	return `${coord.x},${coord.y}`;
}
