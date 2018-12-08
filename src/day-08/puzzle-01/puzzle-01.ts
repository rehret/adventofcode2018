import { parse } from '../lib/parser';
import { Node } from '../lib/node';

export function getSumOfMetadata(input: string): number {
	const tree = parse(input);
	return getMetadataSum(tree);
}

function getMetadataSum(node: Node): number {
	const childrenMetadataSum = node.children.reduce((sum, child) => sum + getMetadataSum(child), 0);
	const nodeMetadataSum = node.metadata.reduce((sum, metadata) => sum + metadata, 0);

	return childrenMetadataSum + nodeMetadataSum;
}
