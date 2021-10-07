import Profile from './Profile';

const ProfileConfig = {
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
			path: '/profile/:id',
			exact: true,
			component: Profile
		}
	]
};

export default ProfileConfig;
