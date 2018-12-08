export class Node {
	public parent: Node | null;
	public children: Node[];
	public metadata: number[];
	public numChildren: number;
	public numMetadata: number;

	constructor(numChildren: number, numMetadata: number) {
		this.parent = null;
		this.children = [];
		this.metadata = [];
		this.numChildren = numChildren;
		this.numMetadata = numMetadata;
	}
}
