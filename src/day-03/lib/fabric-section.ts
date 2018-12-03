import { Coordinate } from './coordinate';

export class FabricSection {

	public start: Coordinate;
	public width: number;
	public height: number;
	public get end(): Coordinate {
		return new Coordinate(this.start.x + this.width, this.start.y + this.height);
	}

	constructor(startX: number, startY: number, width: number, height: number) {
		this.start = new Coordinate(startX, startY);
		this.width = width;
		this.height = height;
	}

	/**
	 * Determines if given section overlaps with this instance
	 * @param section
	 */
	public HasOverlap(section: FabricSection): boolean {
		const thisCorners = [
			this.start,
			new Coordinate(this.start.x, this.end.y),
			this.end,
			new Coordinate(this.end.x, this.start.y)
		];

		const sectionCorners = [
			section.start,
			new Coordinate(section.start.x, section.end.y),
			section.end,
			new Coordinate(section.end.x, section.start.y)
		];

		return thisCorners.some((corner) => section.PointIsInsideSection(corner)) ||
		sectionCorners.some((corner) => this.PointIsInsideSection(corner));
	}

	/**
	 * Calculates the area of overlap between this section and another section.
	 * @param section
	 */
	public GetOverlapArea(section: FabricSection): number {
		if (!this.HasOverlap(section)) {
			return 0;
		}

		const startX = this.start.x >= section.start.x ? this.start.x : section.start.x;
		const endX = this.end.x <= section.end.x ? this.end.x : section.end.x;
		const startY = this.start.y >= section.start.y ? this.start.y : section.start.y;
		const endY = this.end.y <= section.end.y ? this.end.y : section.end.y;

		const overlapWidth = endX - startX;
		const overlapHeight = endY - startY;

		return overlapWidth * overlapHeight;
	}

	/**
	 * Determines if a point is inside the section
	 * @param point
	 */
	private PointIsInsideSection(point: Coordinate): boolean {
		return point.x >= this.start.x && point.y >= this.start.y && point.x <= this.end.x && point.y <= this.end.y;
	}
}
