// credentials/PaperlessNgxApi.credentials.ts
import {
	ICredentialType,
	NodePropertyTypes,
} from 'n8n-workflow';

export class PaperlessNgxApi implements ICredentialType {
	name = 'paperlessNgxApi';
	displayName = 'Paperless NGX API';
	properties = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string' as NodePropertyTypes,
			default: 'https://paperless.dogiakos.com',
		},
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string' as NodePropertyTypes,
			default: '',
		},
	];
}
