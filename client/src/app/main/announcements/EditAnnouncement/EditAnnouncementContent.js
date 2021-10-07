import FormControl from '@material-ui/core/FormControl';
import {
	Box,
	Button,
	Checkbox,
	Chip,
	FormHelperText,
	FormLabel,
	InputLabel,
	ListItemText,
	makeStyles,
	MenuItem,
	Select,
	TextField
} from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import _ from '@lodash';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { getAll, selectUserGroups } from 'app/main/settings/store/userGroupsSlice';
import FuseLoading from '@fuse/core/FuseLoading';
import withReducer from 'app/store/withReducer';
import reducer from 'app/main/settings/store';
import { useHistory } from 'react-router';
import { showMessage } from 'app/store/fuse/messageSlice';
import { create } from '../store/announcementsSlice';

const schema = yup.object().shape({
	headline: yup.string().required('Please input the headline'),
	startDate: yup
		.date()
		.default(() => new Date())
		.required('Please set the start date'),
	endDate: yup.date().required('Please set the end date'),
	audience: yup.array().required('Please select the groups').min(1, 'Please select 1 or more group'),
	content: yup.string().required('Please input the content')
});
const today = new Date();

/**
 * The styles for the audience select
 */
const useStyles = makeStyles(theme => ({
	chips: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	chip: {
		margin: 2
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

/**
 * Main component
 */
function EditAnnouncementContent(props) {
	const { routeParams } = props;

	const classes = useStyles();
	const dispatch = useDispatch();
	const storeUserGroups = useSelector(selectUserGroups);
	const currentUser = useSelector(({ auth }) => auth.user);
	const history = useHistory();

	const [loading, setLoading] = useState(true);
	const [featuredImage, setFeaturedImage] = useState(null);
	const [userGroups, setUserGroups] = useState(storeUserGroups);

	/**
	 * Create the methods to handle the form data
	 * */
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {
			headline: '',
			startDate: today.toISOString().split('T')[0],
			endDate: () => {
				if (today.getMonth() === 11) {
					return new Date(today.getFullYear() + 1, 0, 1).toISOString().split('T')[0];
				}
				return new Date(today.getFullYear(), today.getMonth() + 1, 1).toISOString().split('T')[0];
			},
			audience: [],
			content: ''
		},
		resolver: yupResolver(schema)
	});

	/**
	 * Extract utility methods and values from 'methods'
	 */
	const { formState, getValues, control } = methods;
	const { isValid, dirtyFields, errors } = formState;

	useEffect(() => {
		dispatch(getAll()).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		setUserGroups(storeUserGroups);
	}, [storeUserGroups]);

	/**
	 * This function is called when you click the "Publish" button
	 */
	const handlePublish = () => {
		const { headline, startDate, endDate, audience, content } = getValues();

		//	'audience' will be converted from the array of userGroup names to the array of userGroup _ids
		_.each(audience, groupName => {
			const _id = userGroups.find(uGroup => uGroup.name === groupName).id;
			audience.splice(audience.indexOf(groupName), 1, _id);
		});

		const formData = new FormData();
		formData.append('headline', headline);
		formData.append('startDate', startDate);
		formData.append('endDate', endDate);
		formData.append('content', content);
		formData.append('audience', audience);
		formData.append('creator', currentUser.data._id);
		if (featuredImage) {
			formData.append('featuredImage', featuredImage);
		}

		if (routeParams.op === 'create') {
			dispatch(create(formData)).then(() => {
				//	Alert the success message if the creation is success.
				dispatch(
					showMessage({
						message: 'Announcement creation success!',
						autoHideDuration: 2000,
						anchorOrigin: {
							vertical: 'top',
							horizontal: 'center'
						},
						variant: 'success'
					})
				);
				//	Go to the 'Announcements' page.
				history.push('/announcements');
			});
		}
	};

	/**
	 * This function is called when the user select the image file.
	 */
	const handleFeaturedImage = e => {
		setFeaturedImage(e.currentTarget.files[0]);
	};

	if (loading) {
		return <FuseLoading />;
	}

	return (
		<div className="p-16 sm:p-24 w-full">
			<Controller
				name="headline"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-32"
						error={!!errors.headline}
						required
						helperText={errors?.headline?.message}
						label="Headline"
						autoFocus
						id="headline"
						variant="outlined"
						fullWidth
					/>
				)}
			/>
			<>
				<FormLabel>Featured Image</FormLabel>
				<Box className="mt-8">
					<Button variant="contained" color="secondary" startIcon={<CloudUploadIcon />} component="label">
						UPLOAD
						<input
							onChange={handleFeaturedImage}
							type="file"
							accept="image/*"
							hidden
							name="featuredImage"
						/>
					</Button>
					<span className="pl-24">
						{featuredImage instanceof Object ? featuredImage.name : featuredImage}
					</span>
				</Box>
			</>

			<div className="flex -mx-6 mt-32">
				<Controller
					name="startDate"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							error={!!errors.startDate}
							required
							helperText={errors?.startDate?.message}
							type="date"
							className="mt-8 mb-16 mx-4"
							label="Start Date"
							autoFocus
							id="startDate"
							variant="outlined"
							fullWidth
						/>
					)}
				/>
				<Controller
					name="endDate"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							error={!!errors.endDate}
							required
							helperText={errors?.endDate?.message}
							type="date"
							className="mt-8 mb-16 mx-4"
							label="End Date"
							autoFocus
							id="endDate"
							variant="outlined"
							fullWidth
						/>
					)}
				/>
			</div>
			<Controller
				name="audience"
				control={control}
				render={({ field }) => (
					<FormControl variant="outlined" fullWidth>
						<InputLabel id="audienceLabel">Audience</InputLabel>
						<Select
							{...field}
							error={!!errors.audience}
							required
							labelId="audienceLabel"
							id="audience"
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
							label="Audience"
						>
							{userGroups.map(userGroup => (
								<MenuItem key={userGroup.id} value={userGroup.name}>
									<Checkbox checked={field.value.indexOf(userGroup.name) > -1} />
									<ListItemText primary={userGroup.name} />
								</MenuItem>
							))}
						</Select>
						<FormHelperText error={!!errors.audience}>{errors?.audience?.message}</FormHelperText>
					</FormControl>
				)}
			/>
			<Controller
				name="content"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						error={!!errors.content}
						required
						helperText={errors?.content?.message}
						className="mt-16 mb-16"
						id="content"
						label="Content"
						type="text"
						multiline
						rows={5}
						variant="outlined"
						fullWidth
					/>
				)}
			/>

			<p className="text-center">
				<Button
					className="whitespace-nowrap mx-4 uppercase"
					variant="contained"
					color="secondary"
					size="large"
					disabled={_.isEmpty(dirtyFields) || !isValid}
					onClick={handlePublish}
				>
					Publish
				</Button>
			</p>
		</div>
	);
}

export default withReducer('settings', reducer)(EditAnnouncementContent);
