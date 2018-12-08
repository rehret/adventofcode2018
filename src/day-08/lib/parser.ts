import { Node } from './node';

/**
 * Parse tree from input.
 *
 * Assumes input does not contain too many or too few elements.
 * @param input
 */
export function parse(input: string): Node {
	const values = input.trim().split(/\s+/).map((str) => parseInt(str));

	if (values.length < 2) {
		throw new Error('Input must contain at least one node definition');
	} else if (values.some((v) => isNaN(v))) {
		throw new Error('Input contains non-integer value');
	}

	return getNodes(values)[0];
}

function getNodes(definition: number[], numNodes: number = 1): Node[] {
	const nodes: Node[] = [];

	let workingDefinition = definition;

	while (nodes.length < numNodes) {
		const [ numChildren, numMetadata ] = workingDefinition;
		const node = new Node(numChildren, numMetadata);
		nodes.push(node);

		node.children = getNodes(workingDefinition.slice(2), node.numChildren);

		// Get metadata by removing this node's numChildren and numMetadata values as well as all children definitions
		// from the working definition
		const childrenDefinitionsLength = node.children.reduce((sum, child) => sum + getNodeAndChildrenDefinitionLength(child), 0);
		const metadataAndSiblings = workingDefinition.slice(2 + childrenDefinitionsLength);
		// Set this node's metadata as the first <numMetadata> elements of the metadataAndSiblings array
		node.metadata = metadataAndSiblings.splice(0, node.numMetadata);

		// This node's metadata was removed from the metadataAndSiblings array so we're left with just the siblings
		workingDefinition = metadataAndSiblings;
	}

	return nodes;
}

function getNodeAndChildrenDefinitionLength(node: Node): number {
	// Node definition always contains numChildren and numMetadata
	const definitionBaseSize = 2;
	return definitionBaseSize + node.numMetadata + node.children.reduce((sum, child) => sum + getNodeAndChildrenDefinitionLength(child), 0);
}
