import { authRoles } from 'app/auth';
import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'dashboard',
		title: 'Dashboard',
		translate: 'DASHBOARD',
		type: 'item',
		icon: 'dashboard',
		url: '/dashboard'
	},
	{
		id: 'announcements',
		title: 'Announcements',
		translate: 'ANNOUNCEMENTS',
		type: 'item',
		icon: 'announcements',
		url: '/announcements'
	},
	{
		id: 'tasks',
		title: 'Tasks',
		translate: 'TASKS',
		type: 'collapse',
		icon: 'assignment',
		children: [
			{
				id: 'board',
				title: 'Boards',
				type: 'item',
				url: '/tasks/boards'
			},
			{
				id: 'tasksTable',
				title: 'Tasks Table',
				type: 'item',
				url: '/tasks/table'
			}
		]
	},
	{
		id: 'apps',
		title: 'Apps',
		translate: 'APPS',
		type: 'item',
		icon: 'apps',
		url: '/apps'
	},
	{
		id: 'files',
		title: 'Files',
		translate: 'FILES',
		type: 'item',
		icon: 'folder',
		url: '/files'
	},
	{
		id: 'docs',
		title: 'Docs',
		translate: 'DOCS',
		type: 'item',
		icon: 'description',
		url: '/docs'
	},
	{
		id: 'training',
		title: 'Training',
		translate: 'TRAINING',
		type: 'item',
		icon: 'training',
		url: '/training'
	},
	{
		id: 'calendar',
		title: 'Calendar',
		translate: 'CALENDAR',
		type: 'item',
		icon: 'today',
		url: '/calendar'
	},
	{
		id: 'example',
		title: 'Example',
		translate: 'EXAMPLE',
		type: 'item',
		icon: '',
		url: '/example'
	}
];

export default navigationConfig;
