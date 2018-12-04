import * as fs from 'fs';
import * as path from 'path';
import { getTargetGuardAndMinute } from './puzzle-01';

export { getTargetGuardAndMinute } from './puzzle-01';
export default function() {
	const fileContent = fs.readFileSync(path.resolve(__dirname, '../input.txt'), 'utf-8');
	const result = getTargetGuardAndMinute(fileContent);
	console.log(result);
}
