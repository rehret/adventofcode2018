import { parse } from '../lib/parser';
import { Coordinate } from '../lib/coordinate';
import { FabricSection } from '../lib/fabric-section';

export function findValidFabricSectionId(input: string): number {
	const fabricSections = parse(input);
	const totalOverlap: Coordinate[] = [];

	for (let i = 0; i < fabricSections.length - 1; i++) {
		for (let j = i + 1; j < fabricSections.length; j++) {
			const overlap = fabricSections[i].GetOverlapCoordinates(fabricSections[j]);
			overlap.forEach((c) => totalOverlap.push(c));
		}
	}

	const targetSection = fabricSections.find((section) => totalOverlap.every((coord) => !pointIsInSection(coord, section)));

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
