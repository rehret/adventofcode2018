import * as fs from 'fs';
import * as path from 'path';

function execute(dayInput: string, puzzleInput: string) {
	const day = parseInt(dayInput);
	const puzzle = parseInt(puzzleInput);

	if (!isNaN(day) && !isNaN(puzzle)) {
		const dayStr = `day-${leftPad(day.toString(), 2, '0')}`;
		const puzzleStr = `puzzle-${leftPad(puzzle.toString(), 2, '0')}`;
		const solution = require(`./${dayStr}/${puzzleStr}/index.ts`);

		if (typeof solution.default === 'function') {
			const inputFileContents = getInputFileContents(dayStr);
			const result = solution.default(inputFileContents);
			console.log(result);
		} else {
			console.error(`${dayStr}/${puzzleStr} does not not export a default function`);
		}
	} else {
		throw new Error('Parameter is not a number');
	}
}

function getInputFileContents(dayStr: string): string {
	const filePath = path.resolve(__dirname, `./${dayStr}/input.txt`);
	if (fs.existsSync(filePath)) {
		return fs.readFileSync(filePath, 'utf-8');
	} else {
		return '';
	}
}

function leftPad(str: string, width: number, padCharacter: string = ' '): string {
	let outStr = str;
	while (outStr.length < width) {
		outStr = `${padCharacter}${outStr}`;
	}
	return outStr;
}

const [ dayArg, puzzleArg ] = process.argv.slice(2);
execute(dayArg, puzzleArg);
