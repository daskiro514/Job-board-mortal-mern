import _ from '@lodash';
import configPaths from './configPaths';

export const getRepairedMultipleData = data => {
	_.each(data, elem => {
		_.forEach(elem, (value, key) => {
			if (key === '_id') {
				elem.id = value;
				delete elem._id;
			}
		});
	});
	return data;
};

export const getRepairedSingleData = data => {
	_.forEach(data, (value, key) => {
		if (key === '_id') {
			data.id = value;
			delete data._id;
		}
	});
	return data;
};

export const convertUserdataToFuseType = resUserdata => {
	const userdata = { data: { ...resUserdata } };
	_.each(resUserdata, (value, key) => {
		if (key === 'username') {
			key = 'displayName';
			userdata.data[key] = value;
		} else if (key === 'profilePicture') {
			if (value) {
				value = configPaths.filepath + value;
			} else {
				value = 'assets/images/avatars/mortal.png';
			}
			userdata.data.photoURL = value;
		} else if (key === 'email') {
			userdata.data[key] = value;
		} else if (key === 'groups') {
			if (value.length > 0) {
				const tempGroups = [];
				for (let i = 0; i < value.length; i += 1) {
					tempGroups.push(value[i].name);
				}
				userdata.data[key] = tempGroups;
				userdata.role = tempGroups;
			} else {
				userdata.role = ['user'];
			}
		} else if (key === 'birthday') {
			const birthday = value.split('T')[0];
			userdata.data[key] = birthday;
		} else if (key === 'leftMenu') {
			if (value.length > 0) {
				const tempLeftMenu = [];
				for (let i = 0; i < value.length; i += 1) {
					tempLeftMenu.push(value[i].name);
				}
				userdata.data[key] = tempLeftMenu;
			}
		} else if (key === 'rightMenu') {
			if (value.length > 0) {
				const tempRightMenu = [];
				for (let i = 0; i < value.length; i += 1) {
					tempRightMenu.push(value[i].name);
				}
				userdata.data[key] = tempRightMenu;
			}
		} else if (key === 'dashboard') {
			if (value.length > 0) {
				const tempDashboard = [];
				for (let i = 0; i < value.length; i += 1) {
					tempDashboard.push(value[i].name);
				}
				userdata.data[key] = tempDashboard;
			}
		}
		userdata.data.shortcuts = ['calendar', 'mail', 'contacts', 'todo'];
	});
	return userdata;
};

const stringToColor = string => {
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = '#';

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.substr(-2);
	}
	/* eslint-enable no-bitwise */

	return color;
};

export const stringAvatar = name => {
	return {
		style: {
			backgroundColor: stringToColor(name)
		},
		// children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
		children: name[0]
	};
};
