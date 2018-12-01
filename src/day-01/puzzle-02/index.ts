import * as fs from 'fs';
import * as path from 'path';
import { findDuplicateFrequency } from './puzzle-02';

export { findDuplicateFrequency } from './puzzle-02';
export default function() {
	const fileContent = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8').trim();
	const result = findDuplicateFrequency(fileContent);
	console.log(result);
}
