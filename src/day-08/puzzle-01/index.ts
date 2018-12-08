import * as fs from 'fs';
import * as path from 'path';
import { getMetadataSum } from './puzzle-01';

export { getMetadataSum } from './puzzle-01';
export default function() {
	const fileContents = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8');
	const result = getMetadataSum(fileContents);
	console.log(result);
}
