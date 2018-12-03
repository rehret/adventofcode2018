import { parse } from '../lib/parser';
import { Coordinate } from '../lib/coordinate';
import { FabricSection } from '../lib/fabric-section';
import { findOverlapCoordinates } from '../lib/overlap';

export function findValidFabricSectionId(input: string): number {
	const fabricSections = parse(input);
	const overlapCoords = findOverlapCoordinates(fabricSections);

	const targetSection = fabricSections.find((section) => overlapCoords.every((coord) => !pointIsInSection(coord, section)));

	if (targetSection === undefined) {
		throw new Error('Could not find fabric section without overlap');
	}

	return targetSection.id;
}

function pointIsInSection(point: Coordinate, section: FabricSection) {
	return point.x >= section.start.x &&
		point.y >= section.start.y &&
		point.x <= section.end.x &&
		point.y <= section.end.y;
}
