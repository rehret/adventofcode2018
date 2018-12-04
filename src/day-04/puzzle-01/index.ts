import * as fs from 'fs';
import * as path from 'path';
import { strategy1 } from './puzzle-01';

export { strategy1 } from './puzzle-01';
export default function() {
	const fileContent = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8');
	const result = strategy1(fileContent);
	console.log(result);
}
