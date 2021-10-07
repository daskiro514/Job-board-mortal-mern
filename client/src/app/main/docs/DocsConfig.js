import Doc from './Doc';
import Docs from './Docs';
import EditDoc from './EditDoc';

const DocsConfig = {
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
			path: '/docs',
			exact: true,
			component: Docs
		},
		{
			path: '/docs/:id',
			exact: true,
			component: Doc
		},
		{
			path: 'docs/:op(create|update)/:id?',
			exact: true,
			component: EditDoc
		}
	]
};

export default DocsConfig;
