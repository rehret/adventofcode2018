import { parse } from '../lib/parser';
import { Node } from '../lib/node';

export function getMetadataSum(input: string): number {
	const tree = parse(input);
	return getNodeSum(tree);
}

function getNodeSum(node: Node): number {
	const childrenMetadataSum = node.children.reduce((sum, child) => sum + getNodeSum(child), 0);
	const nodeMetadataSum = node.metadata.reduce((sum, metadata) => sum + metadata, 0);

	return childrenMetadataSum + nodeMetadataSum;
}
