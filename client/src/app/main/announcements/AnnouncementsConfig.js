import Announcements from './Announcements';
import EditAnnouncement from './EditAnnouncement/EditAnnouncement';

const AnnouncementsConfig = {
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
			path: '/announcements',
			exact: true,
			component: Announcements
		},
		{
			path: '/announcements/:op(create|update)/:id?',
			component: EditAnnouncement
		}
	]
};

export default AnnouncementsConfig;
