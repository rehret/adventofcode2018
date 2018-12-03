import * as fs from 'fs';
import * as path from 'path';
import { findFabricOverlaps } from './puzzle-01';

export { findFabricOverlaps } from './puzzle-01';
export default function() {
	const fileContents = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8');
	const result = findFabricOverlaps(fileContents);
	console.log(result);
}
