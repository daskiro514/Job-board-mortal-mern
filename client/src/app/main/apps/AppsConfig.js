import Apps from './Apps';

const AppsConfig = {
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
			path: '/apps',
			component: Apps
		}
	]
};

export default AppsConfig;
