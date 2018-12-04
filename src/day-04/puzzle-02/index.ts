import * as fs from 'fs';
import * as path from 'path';
import { strategy2 } from './puzzle-02';

export { strategy2 } from './puzzle-02';
export default function() {
	const fileContents = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8');
	const result = strategy2(fileContents);
	console.log(result);
}
