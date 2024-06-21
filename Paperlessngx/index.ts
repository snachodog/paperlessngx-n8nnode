// nodes/PaperlessNgx/index.ts
import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { PaperlessNgx } from './PaperlessNgx.node';

export const nodeTypes: INodeType[] = [
	new PaperlessNgx(),
];

export const nodeDescriptions: INodeTypeDescription[] = [
	PaperlessNgx.prototype.description as INodeTypeDescription,
];