import * as fs from 'fs';
import * as path from 'path';
import { getParallelExecutionTime } from './puzzle-02';

export { getParallelExecutionTime } from './puzzle-02';
export default function() {
	const fileContents = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8');
	const result = getParallelExecutionTime(fileContents);
	console.log(result);
}
