export class Config {
	public static default = {
		logoPath: 'https://cdn3.iconfinder.com/data/icons/logos-3/250/angular-512.png',
		imagePath: 'https://via.placeholder.com/500x400',
		pages: {
			error: {
				code: 404,
				message: 'Page Not Found. Sorry :('
			}
		},
		api: {
			uri: 'https://localhost:4000',
			prefix: 'api',
			version: 'v1',
		},
	};
}
