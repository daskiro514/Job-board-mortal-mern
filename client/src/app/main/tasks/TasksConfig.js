import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const TasksConfig = {
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
			path: '/tasks/boards',
			exact: true,
			component: lazy(() => import('./Boards'))
		},
		{
			path: '/tasks/boards/:boardId',
			exact: true,
			component: lazy(() => import('./Board'))
		},
		{
			path: '/tasks/:op(create|update)/:id?',
			exact: true,
			component: lazy(() => import('./EditTask'))
		},
		{
			path: '/tasks/table',
			component: lazy(() => import('./TasksTable/TasksTable'))
		},
		{
			path: '/tasks',
			component: () => <Redirect to="/tasks/boards" />
		}
	]
};

export default TasksConfig;
