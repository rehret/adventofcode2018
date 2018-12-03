import { Coordinate } from './coordinate';

export class FabricSection {

	public start: Coordinate;
	public width: number;
	public height: number;
	public get end(): Coordinate {
		return new Coordinate(this.start.x + (this.width - 1), this.start.y + (this.height - 1));
	}

	constructor(startX: number, startY: number, width: number, height: number) {
		this.start = new Coordinate(startX, startY);
		this.width = width;
		this.height = height;
	}

	/**
	 * Calculates the coordinates of overlap between this section and another section.
	 * @param section
	 */
	public GetOverlapCoordinates(section: FabricSection): Coordinate[] {
		const start = new Coordinate(
			Math.max(this.start.x, section.start.x),
			Math.max(this.start.y, section.start.y)
		);
		const end = new Coordinate(
			Math.min(this.end.x, section.end.x),
			Math.min(this.end.y, section.end.y)
		);

		const overlap: Coordinate[] = [];
		for (let y = start.y; y <= end.y; y++) {
			for (let x = start.x; x <= end.x; x++) {
				overlap.push(new Coordinate(x, y));
			}
		}

		return overlap;
	}
}
