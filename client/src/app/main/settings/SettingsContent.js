import FormControl from '@material-ui/core/FormControl';
import {
	Box,
	Button,
	Checkbox,
	Chip,
	Divider,
	FormControlLabel,
	FormHelperText,
	FormLabel,
	Input,
	InputLabel,
	ListItemText,
	makeStyles,
	MenuItem,
	Select,
	TextField,
	Typography,
	useTheme
} from '@material-ui/core';
import * as yup from 'yup';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import _ from '@lodash';
import { KeyboardDatePicker } from '@material-ui/pickers';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import FuseLoading from '@fuse/core/FuseLoading';
import { yupResolver } from '@hookform/resolvers/yup';
import { getAll as getAllUserGroups, selectUserGroups } from './store/userGroupsSlice';
import { getAll as getAllLayouts, selectLayouts } from './store/layoutsSlice';
import { getAll as getAllComponents, selectComponents } from './store/componentsSlice';
import { updateProfile } from './store/profileSlice';

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	chip: {
		margin: 2
	},
	noLabel: {
		marginTop: theme.spacing(3)
	}
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
};

const today = new Date();

const schema = yup.object().shape({
	position: yup.string().required('Please input the headline'),
	phone: yup.string().required('Please input your phone number'),
	mobile: yup.string().required('Please input your mobile number'),
	email: yup.string().email('Please input your email as its type.').required('Please input your email'),
	birthday: yup
		.date()
		.default(() => today.toISOString().split('T')[0])
		.required('Please set the start date'),
	groups: yup.array().required('Please select the groups').min(1, 'Please select 1 or more group'),
	leftMenu: yup
		.array()
		.required('Please select the components which will be visible on the left menu')
		.min(1, 'Please select 1 or more components'),
	rightMenu: yup
		.array()
		.required('Please select the components which will be visible on the right menu')
		.min(1, 'Please select 1 or more components'),
	dashboard: yup
		.array()
		.required('Please select the components which will be visible on the dashboard page')
		.min(1, 'Please select 1 or more components')
});

/**
 * Main Component
 */
function SettingsContent(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const storeUserGroups = useSelector(selectUserGroups);
	const storeLayouts = useSelector(selectLayouts);
	const storeComponents = useSelector(selectComponents);
	const currentUser = useSelector(({ auth }) => auth.user);

	const { routeParams } = props;

	const [loading, setLoading] = useState(true);
	const [userGroups, setUserGroups] = useState(storeUserGroups);
	const [profilePicture, setProfilePicture] = useState(null);
	const [profileHeader, setProfileHeader] = useState(null);
	const [leftComponents, setLeftComponents] = useState([]);
	const [rightComponents, setRightComponents] = useState([]);
	const [dashboardComponents, setDashboardComponents] = useState([]);

	const classes = useStyles();

	/**
	 * Create the methods to handle the form data
	 * */
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {
			position: '',
			phone: '',
			mobile: '',
			email: '',
			birthday: today.toISOString().split('T')[0],
			groups: [],
			leftMenu: [],
			rightMenu: [],
			dashboard: []
		},
		resolver: yupResolver(schema)
	});

	/**
	 * Extract utility methods and values from 'methods'
	 */
	const { formState, getValues, control, reset } = methods;
	const { isValid, dirtyFields, errors } = formState;

	useEffect(() => {
		if (routeParams.id === currentUser.data._id) {
			reset(currentUser.data);
			setProfilePicture(currentUser.data.profilePicture);
			setProfileHeader(currentUser.data.profileHeader);
		}
	}, [routeParams, currentUser.data]);

	useEffect(() => {
		async function fetchData() {
			await setLoading(true);
			await dispatch(getAllUserGroups());
			await dispatch(getAllLayouts());
			await dispatch(getAllComponents());
			await setLoading(false);
		}
		fetchData();
	}, [dispatch]);

	useEffect(() => {
		setUserGroups(storeUserGroups);
	}, [storeUserGroups]);

	useEffect(() => {
		async function fetchData() {
			await setLoading(true);
			await separateComponentsByLayout(storeComponents);
			await setLoading(false);
		}
		fetchData();
	}, [storeComponents]);

	/**
	 * This function is called when the 'Save' button is clicked.
	 */
	const handleSave = () => {
		const { position, phone, mobile, email, birthday } = getValues();

		const groups = [...getValues().groups];
		const leftMenu = [...getValues().leftMenu];
		const rightMenu = [...getValues().rightMenu];
		const dashboard = [...getValues().dashboard];

		_.each(groups, groupName => {
			const _id = userGroups.find(uGroup => uGroup.name === groupName).id;
			groups.splice(groups.indexOf(groupName), 1, _id);
		});
		_.each(leftMenu, componentName => {
			const _id = leftComponents.find(component => component.name === componentName).id;
			leftMenu.splice(leftMenu.indexOf(componentName), 1, _id);
		});
		_.each(rightMenu, componentName => {
			const _id = rightComponents.find(component => component.name === componentName).id;
			rightMenu.splice(rightMenu.indexOf(componentName), 1, _id);
		});
		_.each(dashboard, componentName => {
			const _id = dashboardComponents.find(component => component.name === componentName).id;
			dashboard.splice(dashboard.indexOf(componentName), 1, _id);
		});

		const formData = new FormData();
		formData.append('position', position);
		formData.append('phone', phone);
		formData.append('mobile', mobile);
		formData.append('email', email);
		formData.append('birthday', birthday);
		formData.append('groups', groups);
		formData.append('leftMenu', leftMenu);
		formData.append('rightMenu', rightMenu);
		formData.append('dashboard', dashboard);
		if (profilePicture) {
			formData.append('profilePicture', profilePicture);
		}
		if (profileHeader) {
			formData.append('profileHeader', profileHeader);
		}
		dispatch(updateProfile({ userId: currentUser.data._id, profileData: formData }));
		history.push(`/profile/${currentUser.data._id}`);
	};

	const handleProfilePicture = e => {
		setProfilePicture(e.currentTarget.files[0]);
	};

	const handleProfileHeader = e => {
		setProfileHeader(e.currentTarget.files[0]);
	};

	/**
	 * Separate the components by its layout ids.
	 */
	const separateComponentsByLayout = components => {
		const tempComponents1 = [];
		const tempComponents2 = [];
		const tempComponents3 = [];
		for (let i = 0; i < components.length; i += 1) {
			if (components[i].layout.name === 'left menu') {
				tempComponents1.push(components[i]);
			} else if (components[i].layout.name === 'right menu') {
				tempComponents2.push(components[i]);
			} else {
				tempComponents3.push(components[i]);
			}
		}
		setLeftComponents(tempComponents1);
		setRightComponents(tempComponents2);
		setDashboardComponents(tempComponents3);
	};

	if (loading) {
		return <FuseLoading />;
	}

	return (
		<div className="p-16 sm:p-24 w-full">
			<Typography variant="h5">Profile</Typography>
			<Divider className="my-10" />

			<Controller
				name="position"
				control={control}
				render={({ field }) => (
					<Box className="flex">
						<Box className="w-1/4">
							<Typography variant="subtitle1" className="font-bold uppercase mt-20">
								Position
							</Typography>
						</Box>
						<Box className="w-3/4">
							<TextField
								{...field}
								className="my-4"
								error={!!errors.position}
								required
								helperText={errors?.position?.message}
								label="Position"
								autoFocus
								id="position"
								variant="outlined"
								fullWidth
							/>
						</Box>
					</Box>
				)}
			/>

			<Controller
				name="phone"
				control={control}
				render={({ field }) => (
					<Box className="flex">
						<Box className="w-1/4">
							<Typography variant="subtitle1" className="font-bold uppercase mt-20">
								Phone Number
							</Typography>
						</Box>
						<Box className="w-3/4">
							<TextField
								{...field}
								className="my-4"
								error={!!errors.phone}
								required
								helperText={errors?.phone?.message}
								label="Phone Number"
								autoFocus
								id="phone"
								variant="outlined"
								fullWidth
							/>
						</Box>
					</Box>
				)}
			/>

			<Controller
				name="mobile"
				control={control}
				render={({ field }) => (
					<Box className="flex">
						<Box className="w-1/4">
							<Typography variant="subtitle1" className="font-bold uppercase mt-20">
								Mobile Number
							</Typography>
						</Box>
						<Box className="w-3/4">
							<TextField
								{...field}
								className="my-4"
								error={!!errors.mobile}
								required
								helperText={errors?.mobile?.message}
								label="Mobile Number"
								autoFocus
								id="mobile"
								variant="outlined"
								fullWidth
							/>
						</Box>
					</Box>
				)}
			/>

			<Controller
				name="email"
				control={control}
				render={({ field }) => (
					<Box className="flex">
						<Box className="w-1/4">
							<Typography variant="subtitle1" className="font-bold uppercase mt-20">
								Email Address
							</Typography>
						</Box>
						<Box className="w-3/4">
							<TextField
								{...field}
								className="my-4"
								error={!!errors.email}
								required
								helperText={errors?.email?.message}
								label="Email Address"
								autoFocus
								id="email"
								variant="outlined"
								fullWidth
							/>
						</Box>
					</Box>
				)}
			/>

			<Controller
				name="birthday"
				control={control}
				render={({ field }) => (
					<Box className="flex">
						<Box className="w-1/4">
							<Typography variant="subtitle1" className="font-bold uppercase mt-20">
								Birthday
							</Typography>
						</Box>
						<Box className="w-3/4">
							<TextField
								{...field}
								type="date"
								className="my-4"
								autoFocus
								id="birthday"
								variant="outlined"
								fullWidth
							/>
						</Box>
					</Box>
				)}
			/>

			<Controller
				name="profilePicture"
				control={control}
				render={({ field }) => (
					<Box className="flex">
						<Box className="w-1/4">
							<Typography variant="subtitle1" className="font-bold uppercase mt-20">
								Profile Picture
							</Typography>
						</Box>
						<Box className="w-3/4 mt-16">
							<Button
								variant="contained"
								color="secondary"
								startIcon={<CloudUploadIcon />}
								component="label"
							>
								UPLOAD
								<input
									onChange={handleProfilePicture}
									type="file"
									accept="image/*"
									name="profilePicture"
									hidden
								/>
							</Button>
							<span className="pl-24">
								{profilePicture instanceof Object ? profilePicture.name : profilePicture}
							</span>
						</Box>
					</Box>
				)}
			/>

			<Controller
				name="profileHeader"
				control={control}
				render={({ field }) => (
					<Box className="flex">
						<Box className="w-1/4">
							<Typography variant="subtitle1" className="font-bold uppercase mt-20">
								Profile Header
							</Typography>
						</Box>
						<Box className="w-3/4 mt-16">
							<Button
								variant="contained"
								color="secondary"
								startIcon={<CloudUploadIcon />}
								component="label"
							>
								UPLOAD
								<input
									onChange={handleProfileHeader}
									type="file"
									accept="image/*"
									name="profileHeader"
									hidden
								/>
							</Button>
							<span className="pl-24">
								{profileHeader instanceof Object ? profileHeader.name : profileHeader}
							</span>
						</Box>
					</Box>
				)}
			/>

			<Controller
				name="groups"
				control={control}
				render={({ field }) => (
					<Box className="flex">
						<Box className="w-1/4">
							<Typography variant="subtitle1" className="font-bold uppercase mt-20">
								Groups
							</Typography>
						</Box>
						<Box className="w-3/4 mt-16">
							<FormControl variant="outlined" fullWidth>
								<InputLabel id="groupsLabel">Groups</InputLabel>
								<Select
									{...field}
									error={!!errors.groups}
									required
									labelId="groupsLabel"
									id="groups"
									multiple
									renderValue={selected => {
										return (
											<div className={classes.chips}>
												{selected.map(value => (
													<Chip key={value} label={value} className={classes.chip} />
												))}
											</div>
										);
									}}
									MenuProps={MenuProps}
									fullWidth
									label="groups"
								>
									{userGroups.map(userGroup => (
										<MenuItem key={userGroup.id} value={userGroup.name}>
											<Checkbox checked={field.value.indexOf(userGroup.name) > -1} />
											<ListItemText primary={userGroup.name} />
										</MenuItem>
									))}
								</Select>
								<FormHelperText error={!!errors.groups}>{errors?.groups?.message}</FormHelperText>
							</FormControl>
						</Box>
					</Box>
				)}
			/>

			<Typography variant="h5" className="mt-32">
				Dashboard
			</Typography>
			<Divider className="my-10" />
			<Controller
				name="leftMenu"
				control={control}
				render={({ field }) => (
					<Box className="flex">
						<Box className="w-1/4">
							<Typography variant="subtitle1" className="font-bold uppercase mt-20">
								Left Menu
							</Typography>
						</Box>
						<Box className="w-3/4 mt-16">
							<FormControl variant="outlined" fullWidth>
								<InputLabel id="leftMenuLabel">Left Menu</InputLabel>
								<Select
									{...field}
									error={!!errors.leftMenu}
									required
									labelId="leftMenuLabel"
									id="leftMenu"
									multiple
									renderValue={selected => {
										return (
											<div className={classes.chips}>
												{selected.map(value => (
													<Chip key={value} label={value} className={classes.chip} />
												))}
											</div>
										);
									}}
									MenuProps={MenuProps}
									fullWidth
									label="leftMenu"
								>
									{leftComponents.map(component => (
										<MenuItem key={component.id} value={component.name}>
											<Checkbox checked={field.value.indexOf(component.name) > -1} />
											<ListItemText primary={component.name} />
										</MenuItem>
									))}
								</Select>
								<FormHelperText error={!!errors.leftMenu}>{errors?.leftMenu?.message}</FormHelperText>
							</FormControl>
						</Box>
					</Box>
				)}
			/>
			<Controller
				name="rightMenu"
				control={control}
				render={({ field }) => (
					<Box className="flex">
						<Box className="w-1/4">
							<Typography variant="subtitle1" className="font-bold uppercase mt-20">
								Right Menu
							</Typography>
						</Box>
						<Box className="w-3/4 mt-16">
							<FormControl variant="outlined" fullWidth>
								<InputLabel id="rightMenuLabel">Right Menu</InputLabel>
								<Select
									{...field}
									error={!!errors.rightMenu}
									required
									labelId="rightMenuLabel"
									id="rightMenu"
									multiple
									renderValue={selected => {
										return (
											<div className={classes.chips}>
												{selected.map(value => (
													<Chip key={value} label={value} className={classes.chip} />
												))}
											</div>
										);
									}}
									MenuProps={MenuProps}
									fullWidth
									label="rightMenu"
								>
									{rightComponents.map(component => (
										<MenuItem key={component.id} value={component.name}>
											<Checkbox checked={field.value.indexOf(component.name) > -1} />
											<ListItemText primary={component.name} />
										</MenuItem>
									))}
								</Select>
								<FormHelperText error={!!errors.rightMenu}>{errors?.rightMenu?.message}</FormHelperText>
							</FormControl>
						</Box>
					</Box>
				)}
			/>
			<Controller
				name="dashboard"
				control={control}
				render={({ field }) => (
					<Box className="flex">
						<Box className="w-1/4">
							<Typography variant="subtitle1" className="font-bold uppercase mt-20">
								Dashboard
							</Typography>
						</Box>
						<Box className="w-3/4 mt-16">
							<FormControl variant="outlined" fullWidth>
								<InputLabel id="dashboardLabel">Dashboard</InputLabel>
								<Select
									{...field}
									error={!!errors.dashboard}
									required
									labelId="dashboardLabel"
									id="dashboard"
									multiple
									renderValue={selected => {
										return (
											<div className={classes.chips}>
												{selected.map(value => (
													<Chip key={value} label={value} className={classes.chip} />
												))}
											</div>
										);
									}}
									MenuProps={MenuProps}
									fullWidth
									label="dashboard"
								>
									{dashboardComponents.map(component => (
										<MenuItem key={component.id} value={component.name}>
											<Checkbox checked={field.value.indexOf(component.name) > -1} />
											<ListItemText primary={component.name} />
										</MenuItem>
									))}
								</Select>
								<FormHelperText error={!!errors.dashboard}>{errors?.dashboard?.message}</FormHelperText>
							</FormControl>
						</Box>
					</Box>
				)}
			/>
			<p className="text-center my-32">
				<Button
					className="whitespace-nowrap mx-4"
					variant="contained"
					color="secondary"
					size="large"
					disabled={_.isEmpty(dirtyFields) || !isValid}
					onClick={handleSave}
				>
					Save
				</Button>
			</p>
		</div>
	);
}

export default SettingsContent;
