import { Coordinate } from './coordinate';

const directions = [ new Coordinate(1, 0), new Coordinate(-1, 0), new Coordinate(0, 1), new Coordinate(0, -1) ];

export function getManhattanDistance(c1: Coordinate, c2: Coordinate): number {
	return Math.abs(c2.x - c1.x) + Math.abs(c2.y - c1.y);
}

export function getBoundedCoordinateAreas(coordinates: Coordinate[]): Coordinate[][] {
	return getBoundedBaseCoordinates(coordinates)
		.map((coord) => getArea(coord, coordinates));
}

// tslint:disable-next-line:max-line-length
function getArea(coord: Coordinate, startingCoords: Coordinate[], startingCoord: Coordinate = coord, visited: Map<string, Coordinate> = new Map()): Coordinate[] {
	visited.set(coord.toString(), coord);

	for (const dir of directions) {
		const target = new Coordinate(coord.x + dir.x, coord.y + dir.y);
		if (!visited.has(target.toString())) {
			const targetDistance = getManhattanDistance(target, startingCoord);
			if (!startingCoords.some((c) => c !== startingCoord && getManhattanDistance(target, c) <= targetDistance)) {
				getArea(target, startingCoords, startingCoord, visited);
			}
		}
	}

	return Array.from(visited.values());
}

/**
 * Get coordinates whose areas are non-infinite
 * @param coordinates
 */
export function getBoundedBaseCoordinates(coordinates: Coordinate[]): Coordinate[] {
	return coordinates.filter((coord, _index, coordArray) => !isInfinite(coord, coordArray));
}

export function isInfinite(target: Coordinate, coordinates: Coordinate[]): boolean {
	return directions.some((dir) => {
		const check = new Coordinate(target.x + dir.x, target.y + dir.y);
		return coordinates
			.filter((coord) => coord !== target)
			.every((coord) => getManhattanDistance(check, coord) > getManhattanDistance(target, coord));
	});
}
