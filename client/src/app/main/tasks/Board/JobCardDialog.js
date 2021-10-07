/**
 * Job form dialog to update it
 * Created at 2021/09/29
 * Created by Ilia L
 */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Dialog,
	DialogTitle,
	AppBar,
	Toolbar,
	IconButton,
	Icon,
	DialogContent,
	TextField,
	Grid,
	Box,
	Chip,
	Avatar,
	Button,
	Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { getUnixTime } from 'date-fns';

import { stringAvatar } from 'utils/functions';
import configPaths from 'utils/configPaths';
import { showMessage } from 'app/store/fuse/messageSlice';

import { closeJobCardDialog } from '../store/jobCardDialogSlice';
import { updateJob } from '../store/jobsSlice';
import { resetAllColumns } from '../store/boardColumnsSlice';

const useStyles = makeStyles(theme => ({
	paper: {
		color: theme.palette.text.primary
	}
}));

function JobCardDialog(props) {
	const dispatch = useDispatch();
	const jobCardDialogOpen = useSelector(({ tasks }) => tasks.jobCardDialog.dialogOpen);
	const storeStatuses = useSelector(({ tasks }) => tasks.jobCardDialog.statuses);
	const storeCategories = useSelector(({ tasks }) => tasks.jobCardDialog.categories);
	const job = useSelector(({ tasks }) => tasks.jobCardDialog.data);
	const classes = useStyles(props);

	const { columnType } = props;
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [status, setStatus] = useState('');
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		if (job) {
			console.log(job);
			setTitle(job.title);
			setDescription(job.description);
			if (job.status) {
				setStatus(storeStatuses.find(item => item._id === job.status).name);
			}
			if (job.categories.length > 0) {
				const tempCategories = [];
				for (let i = 0; i < job.categories.length; i += 1) {
					tempCategories.push(storeCategories.find(item => item._id === job.categories[i]).name);
				}
				setCategories(tempCategories);
			}
		}
	}, [job]);

	//	Make the values of states empty
	const resetStates = () => {
		setTitle('');
		setDescription('');
		setStatus('');
		setCategories([]);
	};

	//	This is called when the "Save" button is clicked
	const handleSubmit = e => {
		dispatch(updateJob({ _id: job._id, title, description, columnType })).then(async ({ payload }) => {
			if (payload) {
				const { columns } = payload;
				await dispatch(resetAllColumns(columns));
				await dispatch(
					showMessage({
						message: 'Job updated.',
						autoHideDuration: 2000,
						anchorOrigin: {
							vertical: 'top',
							horizontal: 'center'
						},
						variant: 'success'
					})
				);
			}
			await resetStates();
			await dispatch(closeJobCardDialog());
		});
	};

	//	This is called when close the dialog
	const handleClose = e => {
		e.preventDefault();
		resetStates();
		dispatch(closeJobCardDialog());
	};

	if (!job) {
		return null;
	}
	return (
		<Dialog
			classes={{
				paper: clsx(classes.paper, 'max-w-lg w-full m-24')
			}}
			onClose={handleClose}
			open={jobCardDialogOpen}
		>
			<DialogTitle component="div" className="p-0">
				<AppBar position="static" elevation={0}>
					<Toolbar className="flex w-full overflow-x-auto px-8 sm:px-16">
						<div className="flex flex-1">{title}</div>
						<IconButton color="inherit" onClick={handleClose}>
							<Icon>close</Icon>
						</IconButton>
					</Toolbar>
				</AppBar>
			</DialogTitle>
			<DialogContent className="py-32">
				{/* title */}
				<TextField
					name="title"
					label="Title"
					variant="outlined"
					className="mb-16"
					error={!title}
					helperText={!title ? 'Please input the title of job' : ''}
					value={title}
					onChange={e => setTitle(e.target.value)}
					fullWidth
				/>
				{/* description */}
				<TextField
					multiline
					rows={5}
					name="description"
					label="Description"
					variant="outlined"
					className="mb-16"
					value={description}
					onChange={e => setDescription(e.target.value)}
					fullWidth
				/>
				<Grid container className="mb-16">
					<Grid item xs={12} md={4}>
						<Box className="flex items-center justify-center">
							<Typography variant="subtitle1">Status: </Typography>&nbsp;&nbsp;&nbsp;
							{status ? <Chip label={status} color="primary" variant="outlined" /> : ''}
						</Box>
					</Grid>
					<Grid item xs={12} md={4}>
						<Box className="flex items-center justify-center">
							<Typography variant="subtitle1">Assigned User: </Typography>&nbsp;&nbsp;&nbsp;
							{job.user ? (
								job.user.profilePicture ? (
									<>
										<Avatar
											className="mx-4 w-32 h-32"
											src={configPaths.filepath + job.user.profilePicture}
										/>
										{job.user.username}
									</>
								) : (
									<>
										<Avatar className="mx-4 w-32 h-32" {...stringAvatar(job.user.name)} />
										{job.user.username}
									</>
								)
							) : (
								''
							)}
						</Box>
					</Grid>
					<Grid item xs={12} md={4}>
						<Box className="flex items-center justify-center">
							<Typography variant="subtitle1">Due Date: </Typography>&nbsp;&nbsp;&nbsp;
							{job.dueDate ? (
								<Chip
									icon={<Icon className="text-16 text-white">access_time</Icon>}
									label={job.dueDate.name.split('T')[0]}
									className={
										getUnixTime(new Date()) > getUnixTime(new Date(job.dueDate.name))
											? 'bg-red text-white'
											: 'bg-green text-white'
									}
								/>
							) : (
								''
							)}
						</Box>
					</Grid>
				</Grid>
				<Box className="mb-32 flex justify-center">
					<Typography variant="subtitle1">Categories: </Typography>&nbsp;&nbsp;&nbsp;
					{categories.map((item, key) => (
						<Chip key={key} label={item} />
					))}
				</Box>
				{/* Save button */}
				<Box className="flex justify-center">
					<Button variant="contained" color="secondary" disabled={!title} onClick={handleSubmit}>
						Save
					</Button>
				</Box>
			</DialogContent>
		</Dialog>
	);
}

export default JobCardDialog;
