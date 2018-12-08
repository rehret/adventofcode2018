import * as fs from 'fs';
import * as path from 'path';
import { getSumOfMetadata } from './puzzle-01';

export { getSumOfMetadata } from './puzzle-01';
export default function() {
	const fileContents = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8');
	const result = getSumOfMetadata(fileContents);
	console.log(result);
}
