import * as fs from 'fs';
import * as path from 'path';
import { getComplexMetadataSum } from './puzzle-02';

export { getComplexMetadataSum } from './puzzle-02';
export default function() {
	const fileContents = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8');
	const result = getComplexMetadataSum(fileContents);
	console.log(result);
}
