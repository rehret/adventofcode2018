import * as fs from 'fs';
import * as path from 'path';
import { getFinalFrequency } from './puzzle-01';

export { getFinalFrequency } from './puzzle-01';
export default function() {
	const fileContent = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8').trim();
	const result = getFinalFrequency(fileContent);
	console.log(result);
}
