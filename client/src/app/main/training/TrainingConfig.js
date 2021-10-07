import Training from './Training';

const TrainingConfig = {
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
			path: '/training',
			component: Training
		}
	]
};

export default TrainingConfig;
