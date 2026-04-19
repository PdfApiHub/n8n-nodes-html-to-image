import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeApiError, NodeOperationError } from 'n8n-workflow';
import { description, execute } from './actions/generateImage';

export class HtmlToImage implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HTML to Image',
		name: 'htmlToImage',
		icon: { light: 'file:../../icons/icon.svg', dark: 'file:../../icons/icon.svg' },
		group: ['transform'],
		version: 1,
		description: 'Capture website screenshots or render HTML as PNG images using PDF API Hub',
		defaults: { name: 'HTML to Image' },
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'pdfapihubApi', required: true }],
		usableAsTool: true,
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
				{
								"name": "URL to Image",
								"value": "urlToImage",
								"description": "Capture website screenshot as image",
								"action": "Capture a website screenshot as an image"
				},
				{
								"name": "HTML to Image",
								"value": "htmlToImage",
								"description": "Generate image from HTML/CSS",
								"action": "Convert HTML to image"
				}
],
				default: 'urlToImage',
			},
			...description,
		],
	};

	methods = {
		loadOptions: {
			async getTemplates(this: import('n8n-workflow').ILoadOptionsFunctions) {
				const responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'pdfapihubApi', {
					method: 'GET', url: 'https://pdfapihub.com/api/v1/templates', json: true,
				}) as { templates?: Array<{ template_id: string; name?: string }> };
				return (responseData.templates ?? []).map((t) => ({ name: t.name || t.template_id, value: t.template_id }));
			},
			async getStarterTemplates(this: import('n8n-workflow').ILoadOptionsFunctions) {
				try {
					const responseData = await this.helpers.httpRequest({ method: 'GET', url: 'https://pdfapihub.com/starter-templates.json', json: true }) as Array<{ id: string; title: string; category?: string }>;
					return [{ name: '— None —', value: '' }, ...responseData.map((t) => ({ name: t.category ? `${t.category}: ${t.title}` : t.title, value: t.id }))];
				} catch { return [{ name: '— None —', value: '' }]; }
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as string;
				await execute.call(this, i, returnData, operation);
			} catch (error) {
				if (this.continueOnFail()) {
					const message = error instanceof Error ? error.message : 'Unknown error';
					returnData.push({ json: { error: message }, pairedItem: { item: i } });
				} else if (error instanceof NodeApiError) {
					throw error;
				} else {
					throw new NodeOperationError(this.getNode(), error, { itemIndex: i });
				}
			}
		}
		return [returnData];
	}
}
