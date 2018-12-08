import { Node } from './node';

/**
 * Parse tree from input.
 *
 * Assumes input does not contain too many or too few elements.
 * @param input
 */
export function parse(input: string): Node {
	const values = input.trim().split(/\s+/).map((str) => parseInt(str));

	if (values.some((v) => isNaN(v))) {
		throw new Error('Input contains non-integer value');
	}

	const [ rootNumChildren, rootNumMetadata, ...definitions ] = values;
	const root = new Node(rootNumChildren, rootNumMetadata);

	let node = root;
	let index = 0;
	while (index < definitions.length) {
		if (node.children.length < node.numChildren) {
			const child = new Node(definitions[index], definitions[index + 1]);
			child.parent = node;
			index += 2;
			node.children.push(child);
			node = child;
		} else if (node.metadata.length < node.numMetadata) {
			node.metadata.push(definitions[index]);
			index++;
		} else {
			node = node.parent as Node;
		}
	}

	return root;
}
