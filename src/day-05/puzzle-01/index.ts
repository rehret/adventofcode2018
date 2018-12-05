import * as fs from 'fs';
import * as path from 'path';
import { getResultingPolymerLength } from './puzzle-01';

export { getResultingPolymerLength } from './puzzle-01';
export default function() {
	const fileContents = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8');
	const result = getResultingPolymerLength(fileContents);
	console.log(result);
}
