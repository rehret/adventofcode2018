import * as fs from 'fs';
import * as path from 'path';
import { puzzle01 } from './puzzle-01';
import { split } from '../lib/input-splitter';

export { puzzle01 } from './puzzle-01';
export default function() {
	const fileContent = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8').trim();
	const result = puzzle01(split(fileContent));
	console.log(result);
}
