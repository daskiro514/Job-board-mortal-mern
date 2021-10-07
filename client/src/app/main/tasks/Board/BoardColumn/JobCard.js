/**
 * A job card
 * Created at 2021/09/20
 * Created by Ilia L
 */

import React from 'react';
import _ from '@lodash';
import { Avatar, Card, Icon, CardHeader, IconButton, CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import getUnixTime from 'date-fns/getUnixTime';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { stringAvatar } from 'utils/functions';
import configPaths from 'utils/configPaths';
import { openDialog } from 'app/store/fuse/deleteConfirmDialogSlice';

import { openJobCardDialog } from '../../store/jobCardDialogSlice';
import { deleteJob } from '../../store/jobsSlice';

const useStyles = makeStyles(theme => ({
	card: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	}
}));

function JobCard(props) {
	const dispatch = useDispatch();

	const classes = useStyles(props);
	const { index, job, boardColumn, columnType } = props;

	const handleJobCardClick = e => {
		e.preventDefault();
		console.log(job);
		dispatch(openJobCardDialog(job));
	};

	const handleDeleteJob = e => {
		e.preventDefault();
		if (boardColumn._id) {
			dispatch(openDialog(deleteJob({ _id: job._id, columnData: { columnType, columnId: boardColumn._id } })));
		} else {
			dispatch(openDialog(deleteJob({ _id: job._id, columnData: { columnType } })));
		}
	};

	return (
		<Draggable draggableId={`${boardColumn._id}/${job._id}`} index={index} type="job">
			{(provided, snapshot) => (
				<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
					<Card
						className={clsx(
							classes.card,
							snapshot.isDragging ? 'shadow-lg' : 'shadow-0',
							'w-full mb-16 rounded-16 cursor-pointer border-1'
						)}
					>
						<CardHeader
							title={job.title}
							titleTypographyProps={{ className: 'text-base font-bold' }}
							action={
								<IconButton onClick={handleDeleteJob}>
									<Icon>close</Icon>
								</IconButton>
							}
							className="pb-0"
						/>
						<CardActionArea onClick={handleJobCardClick}>
							<div className="p-16 pb-0">
								{/* Due date */}
								{job.dueDate ? (
									<div className="flex items-center mb-12 -mx-4">
										<div
											className={clsx(
												'flex items-center px-8 py-4 mx-4 rounded-16',
												getUnixTime(new Date()) > getUnixTime(new Date(job.dueDate.name))
													? 'bg-red text-white'
													: 'bg-green text-white'
											)}
										>
											<Icon className="text-16">access_time</Icon>
											<span className="mx-4">{job.dueDate.name.split('T')[0]}</span>
										</div>
									</div>
								) : (
									<></>
								)}

								{/* User */}
								{job.user ? (
									<div className="flex flex-wrap mb-12 -mx-4">
										<Tooltip title={job.user.username}>
											{job.user.profilePicture ? (
												<Avatar
													className="mx-4 w-32 h-32"
													src={configPaths.filepath + job.user.profilePicture}
												/>
											) : (
												<Avatar className="mx-4 w-32 h-32" {...stringAvatar(job.user.name)} />
											)}
										</Tooltip>
										<div />
									</div>
								) : (
									<></>
								)}
							</div>

							<div className="flex justify-between h-48 px-16 border-t-1">
								<div className="flex items-center -mx-6">
									{job.description !== '' && (
										<Icon className="text-18 mx-6" color="action">
											description
										</Icon>
									)}
								</div>
								<div className="flex items-center justify-end -mx-6" />
							</div>
						</CardActionArea>
					</Card>
				</div>
			)}
		</Draggable>
	);
}

export default JobCard;
