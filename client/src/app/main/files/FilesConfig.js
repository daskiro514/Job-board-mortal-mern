import Files from './Files';

const FilesConfig = {
	settings: {
		layout: {
			config: {
				footer: {
					display: false
				}
			}
		}
	},
	routes: [
		{
			path: '/files',
			component: Files
		}
	]
};

export default FilesConfig;
