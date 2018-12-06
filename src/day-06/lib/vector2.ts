import { Coordinate } from './coordinate';

export class Vector2 {
	public x: number;
	public y: number;

	public get magnitude(): number {
		return Math.sqrt(this.dot(this));
	}

	constructor(from: Coordinate, to: Coordinate);
	constructor(x: number, y: number);
	constructor(param1: Coordinate | number, param2: Coordinate | number) {
		if (param1 instanceof Coordinate && param2 instanceof Coordinate) {
			this.x = param2.x - param1.x;
			this.y = param2.y - param1.y;
		} else {
			this.x = param1 as number;
			this.y = param2 as number;
		}
	}

	public dot(vector: Vector2): number {
		return (this.x * vector.x) + (this.y * vector.y);
	}

	public normalize(): Vector2 {
		const magnitude = this.magnitude;
		return new Vector2(this.x / magnitude, this.y / magnitude);
	}
}
