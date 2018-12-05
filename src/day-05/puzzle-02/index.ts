import * as fs from 'fs';
import * as path from 'path';
import { getOptimalPolymerLength } from './puzzle-02';

export { getOptimalPolymerLength } from './puzzle-02';
export default function() {
	const fileContents = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8');
	const result = getOptimalPolymerLength(fileContents);
	console.log(result);
}
