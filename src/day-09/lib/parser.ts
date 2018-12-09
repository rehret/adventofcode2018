export function parse(input: string): [number, number] {
	const matches = input.trim().match(/^(\d+) players; last marble is worth (\d+) points$/);

	if (matches === null) {
		throw new Error('Input in invalid format');
	}

	return [ parseInt(matches[1]), parseInt(matches[2]) ];
}
