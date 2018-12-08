import * as fs from 'fs';
import * as path from 'path';
import { getInstructionOrder } from './puzzle-01';

export { getInstructionOrder } from './puzzle-01';
export default function() {
	const fileContents = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8');
	const result = getInstructionOrder(fileContents);
	console.log(result);
}
