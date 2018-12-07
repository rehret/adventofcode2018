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
			if (startingCoords.every((c) => c === startingCoord || targetDistance < getManhattanDistance(target, c))) {
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
	return coordinates.filter((coord, _index, coordArray) => !areaIsInfinite(coord, coordArray));
}

/**
 * Determine if area around coordinate is not bounded by neighboring coordinates.
 * @param base
 * @param coordinates
 */
export function areaIsInfinite(base: Coordinate, coordinates: Coordinate[]): boolean {
	coordinates = coordinates.filter((coord) => coord !== base);

	return coordinates.map((coord) => getPerpendicularPoints(base, coord))
		.reduce((arr, perpendicularPair) => arr.concat(perpendicularPair), [] as Coordinate[])
		.some((perpendicular) => coordinates.every((c) => {
			return getManhattanDistance(new Coordinate(base.x + perpendicular.x, base.y + perpendicular.y), c) > getManhattanDistance(base, c);
		}));
}

function getPerpendicularPoints(c1: Coordinate, c2: Coordinate): [Coordinate, Coordinate] {
	const dx = c2.x - c1.x;
	const dy = c2.y - c1.y;

	return [
		new Coordinate(dy, -dx),
		new Coordinate(-dy, dx)
	];
}
