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
		if (!this.HasOverlap(section)) {
			return [];
		}

		const startX = this.start.x >= section.start.x ? this.start.x : section.start.x;
		const endX = this.end.x <= section.end.x ? this.end.x : section.end.x;
		const startY = this.start.y >= section.start.y ? this.start.y : section.start.y;
		const endY = this.end.y <= section.end.y ? this.end.y : section.end.y;

		const overlap: Coordinate[] = [];
		for (let y = startY; y <= endY; y++) {
			for (let x = startX; x <= endX; x++) {
				overlap.push(new Coordinate(x, y));
			}
		}

		return overlap;
	}
}
