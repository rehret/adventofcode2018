import { parse } from '../lib/parser';
import { getBoundedCoordinateAreas } from '../lib/infinite-grid';

export function puzzle01(input: string): number {
	return getBoundedCoordinateAreas(parse(input))
		.reduce((maxLength, area) => area.length > maxLength ? area.length : maxLength, 0);
}
