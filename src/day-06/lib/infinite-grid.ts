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

export function areaIsInfinite(base: Coordinate, coordinates: Coordinate[]): boolean {
	coordinates = coordinates.filter((coord) => coord !== base);
	return coordinates
		.map((coord) => getPointsOnPerpendicular(base, coord))
		.some((perpendicularPoints) => {
			return perpendicularPoints.some((perpendicular) => {
				return coordinates
					.every((referenceCoord) => {
						return getDistance(perpendicular, referenceCoord) > getDistance(base, referenceCoord);
					});
			});
		});
}

function getDistance(c1: Coordinate, c2: Coordinate): number {
	return Math.sqrt(Math.pow(c2.x - c1.x, 2) + Math.pow(c2.y - c1.y, 2));
}

function getPointsOnPerpendicular(base: Coordinate, reference: Coordinate): [Coordinate, Coordinate] {
	const rise = reference.y - base.y;
	const run = reference.x - base.x;

	return [
		new Coordinate(base.x + rise, base.y + -run),
		new Coordinate(base.x + -rise, base.y + run)
	];
}
