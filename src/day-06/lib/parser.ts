import { Coordinate } from './coordinate';

export function parse(input: string): Coordinate[] {
	return input
		.trim()
		.split(/\n/)
		.map((line) => {
			const matches = line.trim().match(/(\d+),\s+(\d+)/);

			if (matches === null) {
				throw new Error('Invalid coordinate');
			}

			return new Coordinate(parseInt(matches[1]), parseInt(matches[2]));
		});
}
