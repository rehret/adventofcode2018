import { parse } from '../lib/parser';
import { Node } from '../lib/node';

export function getComplexMetadataSum(input: string): number {
	const tree = parse(input);
	return getNodeSum(tree);
}

function getNodeSum(node: Node): number {
	if (node.children.length === 0) {
		return node.metadata.reduce((sum, val) => sum + val, 0);
	} else {
		let sum = 0;
		for (const index of node.metadata) {
			if (index > 0 && index <= node.children.length) {
				sum += getNodeSum(node.children[index - 1]);
			}
		}
		return sum;
	}
}
