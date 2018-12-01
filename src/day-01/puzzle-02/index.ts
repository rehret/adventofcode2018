import * as fs from 'fs';
import * as path from 'path';
import { findDuplicateFrequency } from './puzzle-02';
import { split } from '../lib/input-splitter';

export { findDuplicateFrequency } from './puzzle-02';
export default function() {
	const fileContent = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8').trim();
	const result = findDuplicateFrequency(split(fileContent));
	console.log(result);
}
