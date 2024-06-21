// nodes/PaperlessNgx/PaperlessNgx.node.ts
import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class PaperlessNgx implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Paperless NGX',
		name: 'paperlessNgx',
		icon: 'file:paperlessNgx.svg',
		group: ['transform'],
		version: 1,
		description: 'Consume Paperless NGX API',
		defaults: {
			name: 'Paperless NGX',
			color: '#1F72E5',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'paperlessNgxApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Documents',
						value: 'documents',
					},
				],
				default: 'documents',
				description: 'The resource to operate on.',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all documents',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a specific document by ID',
					},
				],
				default: 'getAll',
				description: 'The operation to perform.',
			},
			{
				displayName: 'Document ID',
				name: 'documentId',
				type: 'string',
				displayOptions: {
					show: {
						resource: [
							'documents',
						],
						operation: [
							'get',
						],
					},
				},
				default: '',
				description: 'ID of the document to retrieve',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = this.getCredentials('paperlessNgxApi') as { baseUrl: string, apiToken: string };

		for (let i = 0; i < items.length; i++) {
			const resource = this.getNodeParameter('resource', i) as string;
			const operation = this.getNodeParameter('operation', i) as string;

			let responseData;
			if (resource === 'documents') {
				if (operation === 'getAll') {
					const endpoint = '/api/documents/';
					const options = {
						method: 'GET',
						headers: {
							'Authorization': `Token ${credentials.apiToken}`,
						},
						uri: `${credentials.baseUrl}${endpoint}`,
						json: true,
					};
					responseData = await this.helpers.request(options);
				} else if (operation === 'get') {
					const documentId = this.getNodeParameter('documentId', i) as string;
					const endpoint = `/api/documents/${documentId}/`;
					const options = {
						method: 'GET',
						headers: {
							'Authorization': `Token ${credentials.apiToken}`,
						},
						uri: `${credentials.baseUrl}${endpoint}`,
						json: true,
					};
					responseData = await this.helpers.request(options);
				}
			}
			returnData.push({ json: responseData });
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
