import Settings from './Settings';

const SettingsConfig = {
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
			path: '/settings/:id',
			exact: true,
			component: Settings
		}
	]
};

export default SettingsConfig;
