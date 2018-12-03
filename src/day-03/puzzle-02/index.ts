import * as fs from 'fs';
import * as path from 'path';
import { findValidFabricSectionId } from './puzzle-02';

export { findValidFabricSectionId } from './puzzle-02';
export default function() {
	const fileContents = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8');
	const result = findValidFabricSectionId(fileContents);
	console.log(result);
}
