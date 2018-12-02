import * as fs from 'fs';
import * as path from 'path';
import { boxFinder } from './puzzle-02';

export { boxFinder } from './puzzle-02';
export default function() {
	const fileContents = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8');
	const result = boxFinder(fileContents);
	console.log(result);
}
