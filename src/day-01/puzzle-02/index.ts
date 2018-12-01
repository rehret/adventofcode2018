import * as fs from 'fs';
import * as path from 'path';
import { puzzle02 } from './puzzle-02';
import { split } from '../lib/input-splitter';

export { puzzle02 } from './puzzle-02';
export default function() {
	const fileContent = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8').trim();
	const result = puzzle02(split(fileContent));
	console.log(result);
}
