import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import LoginConfig from 'app/main/login/LoginConfig';
import RegisterConfig from 'app/main/register/RegisterConfig';
import { authRoles } from 'app/auth';
import DashboardConfig from 'app/main/dashboard/DashboardConfig';
import TasksConfig from 'app/main/tasks/TasksConfig';
import AppsConfig from 'app/main/apps/AppsConfig';
import FilesConfig from 'app/main/files/FilesConfig';
import DocsConfig from 'app/main/docs/DocsConfig';
import TrainingConfig from 'app/main/training/TrainingConfig';
import CalendarAppConfig from 'app/main/calendar/CalendarAppConfig';
import ExampleConfig from 'app/main/example/ExampleConfig';
import AnnouncementsConfig from 'app/main/announcements/AnnouncementsConfig';
import ProfileConfig from 'app/main/profile/ProfileConfig';
import SettingsConfig from 'app/main/settings/SettingsConfig';

const routeConfigs = [
	DashboardConfig,
	TasksConfig,
	AppsConfig,
	FilesConfig,
	DocsConfig,
	TrainingConfig,
	CalendarAppConfig,
	AnnouncementsConfig,
	ProfileConfig,
	SettingsConfig,
	LoginConfig,
	RegisterConfig,
	ExampleConfig
];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin', 'staff', 'user']),
	{
		path: '/',
		auth: authRoles.user,
		component: () => <Redirect to="/dashboard" />
	},
	{
		component: () => <Redirect to="/pages/errors/error-404" />
	}
];

export default routes;
