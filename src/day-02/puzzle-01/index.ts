import * as fs from 'fs';
import * as path from 'path';
import { checksum } from './puzzle-01';

export { checksum } from './puzzle-01';
export default function() {
	const fileContents = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8');
	const result = checksum(fileContents);
	console.log(result);
}
