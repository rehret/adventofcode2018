import { Coordinate } from './coordinate';
import { Vector2 } from './vector2';

const directions = [ new Vector2(1, 0), new Vector2(-1, 0), new Vector2(0, 1), new Vector2(0, -1) ];

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
	// Finds vectors from other coordinates to target coordinate
	// Gets the perpendicular vectors to those vectors (2 per base vector)
	// Checks for a perpendicular vector whose dot product with every base vector is greater than or equal to 0
	//   - Perpendicular unit vectors have a dot product of 0
	//   - Unit vectors in the same direction have a dot product of 1
	//   - Unit vectors in opposite directions have a dot product of -1

	coordinates = coordinates.filter((coord) => coord !== base);
	const vectorsToBase = coordinates.map((coord) => new Vector2(coord, base).normalize());

	return vectorsToBase.map((vector) => getPerpendicularVectors(vector))
		.reduce((arr, vectorPair) => arr.concat(vectorPair), [] as Vector2[])
		.map((perpendicularVector) => perpendicularVector.normalize())
		.some((perpendicularVector) => vectorsToBase.every((v) => v.dot(perpendicularVector) >= 0));
}

function getPerpendicularVectors(vector: Vector2): [Vector2, Vector2] {
	return [
		new Vector2(vector.y, -vector.x),
		new Vector2(-vector.y, vector.x)
	];
}
