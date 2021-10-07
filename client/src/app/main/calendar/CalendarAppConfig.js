import { lazy } from 'react';

const CalendarAppConfig = {
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
			path: '/calendar',
			component: lazy(() => import('./CalendarApp'))
		}
	]
};

export default CalendarAppConfig;
