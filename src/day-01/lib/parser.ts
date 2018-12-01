export function parse(input: string): number {
	const result = parseInt(input);

	if (isNaN(result)) {
		throw new TypeError(`Input string does not represent an integer: "${input}"`);
	}

	return result;
}
