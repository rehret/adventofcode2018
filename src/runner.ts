function execute(dayInput: string, puzzleInput: string) {
	const day = parseInt(dayInput);
	const puzzle = parseInt(puzzleInput);

	if (!isNaN(day) && !isNaN(puzzle)) {
		const dayStr = `day-${leftPad(day.toString(), 2, '0')}`;
		const puzzleStr = `puzzle-${leftPad(puzzle.toString(), 2, '0')}`;
		const solution = require(`./${dayStr}/${puzzleStr}/index.ts`);

		const functionKey = Object.keys(solution).find((key) => typeof solution[key] === 'function');
		if (functionKey) {
			console.log(solution[functionKey]());
		} else {
			throw new Error(`Day ${day} Puzzle ${puzzle} does not export a function`);
		}
	} else {
		throw new Error('Parameter is not a number');
	}
}

function leftPad(str: string, width: number, padCharacter: string = ' '): string {
	let outStr = str;
	while (outStr.length < width) {
		outStr = `${padCharacter}${outStr}`;
	}
	return outStr;
}

const [_nodeCmd, _script, dayArg, puzzleArg] = process.argv;
execute(dayArg, puzzleArg);
