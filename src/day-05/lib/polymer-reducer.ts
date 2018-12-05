export function getFinalPolymer(polymer: string[]): string[] {
	let reactionIndices = getReactionIndices(polymer);

	while (reactionIndices.length > 0) {
		let removedElements = 0;
		for (const index of reactionIndices) {
			const targetIndex = index - removedElements;
			polymer.splice(targetIndex, 2);
			removedElements += 2;
		}

		reactionIndices = getReactionIndices(polymer);
	}

	return polymer;
}

function getReactionIndices(polymer: string[]): number[] {
	// Do the following:
	//   Map the polymer to its indices
	//   Remove the last index from the list (since we access polymer[index + 1] in the next step)
	//   Filter the indices by which units of the polymer react with the following unit
	//   Filter the resulting list of indices to prevent a double reaction on a single unit
	//     For example: 'cCc' would originally have reactions at 0 and 1, but we can't remove
	//     the 'C' twice, so we first limit the reaction to only index 0.
	return polymer.map((_unit, index) => index)
		.slice(0, -1)
		.filter((polymerIndex) => getUnitInversion(polymer[polymerIndex]) === polymer[polymerIndex + 1])
		.filter((polymerIndex, _index, indices) => indices.indexOf(polymerIndex - 1) === -1);
}

function getUnitInversion(unit: string) {
	if (unit.toLowerCase() === unit) {
		return unit.toUpperCase();
	} else {
		return unit.toLowerCase();
	}
}
