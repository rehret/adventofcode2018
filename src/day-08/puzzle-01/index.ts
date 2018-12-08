import * as fs from 'fs';
import * as path from 'path';
import { puzzle01 } from './puzzle-01';

export { puzzle01 } from './puzzle-01';
export default function() {
	const fileContents = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8');
	const result = puzzle01(fileContents);
	console.log(result);
}
