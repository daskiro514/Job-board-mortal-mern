/**
 * Individual page
 * Created at 2021/09/16
 * Created by Ilia L
 */

import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { Link, withRouter, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { AppBar, Button, Hidden, Icon, IconButton, Toolbar, MenuItem, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import withReducer from 'app/store/withReducer';
import { showMessage } from 'app/store/fuse/messageSlice';
import FuseLoading from '@fuse/core/FuseLoading';
import { CATEGORY, DUE_DATE, STATUS, USER } from 'utils/constants';

import reducer from '../store';
import { deleteBoard, selectBoards } from '../store/boardsSlice';
import { getAllJobs, replaceJob, selectJobs } from '../store/jobsSlice';
import { getAllBoardColumnsExceptDueDate } from '../store/jobCardDialogSlice';
import {
	getAllJobCategories,
	getAllJobDueDates,
	getAllJobStatuses,
	getAllUsers,
	replaceColumns,
	selectBoardColumns
} from '../store/boardColumnsSlice';
import BoardTitle from './BoardTitle';
import BoardColumn from './BoardColumn';
import AddColumn from './AddColumn';

import JobPoolColumn from './JobPoolColumn';
import JobCardDialog from './JobCardDialog';
import DeleteConfirmDialog from '../../../shared-components/DeleteConfirmDialog';

const useStyles = makeStyles(theme => ({
	'@global': {
		'#fuse-main': {
			height: '100vh'
		}
	}
}));

function Board(props) {
	const dispatch = useDispatch();
	const { boardId } = useParams();
	const containerRef = useRef(null);
	const history = useHistory();

	const storeBoards = useSelector(selectBoards);
	const storeJobs = useSelector(selectJobs);
	const storeBoardCloumns = useSelector(selectBoardColumns);

	const [board, setBoard] = useState(null);
	const [columns, setColumns] = useState([]);
	const [columnType, setColumnType] = useState(STATUS);
	const [loading, setLoading] = useState(true);

	//	Get the board data by its object id and get all jobs
	useEffect(() => {
		setBoard(storeBoards.find(item => item._id === boardId));
		dispatch(getAllJobs());
		dispatch(getAllBoardColumnsExceptDueDate());
	}, [boardId]);

	//	Change the columns of the board by the "sortby" value
	useEffect(() => {
		setLoading(true);
		switch (columnType) {
			case STATUS:
				dispatch(getAllJobStatuses()).then(() => setLoading(false));
				return;
			case CATEGORY:
				dispatch(getAllJobCategories()).then(() => setLoading(false));
				return;
			case DUE_DATE:
				dispatch(getAllJobDueDates()).then(() => setLoading(false));
				return;
			case USER:
				dispatch(getAllUsers()).then(() => setLoading(false));
				break;
			default:
				break;
		}
	}, [columnType]);

	//	Delete the current board
	const handleDeleteBoard = () => {
		dispatch(deleteBoard(boardId)).then(() => {
			dispatch(
				showMessage({
					message: 'The board has been DELETED successfully.',
					autoHideDuration: 2000,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'center'
					},
					variant: 'success'
				})
			);
			history.push('/tasks/boards');
		});
	};

	//	When the job card which has been dragging is dropped on the column
	const onDragEnd = result => {
		console.log(result);
		const { source, destination } = result;
		// dropped nowhere
		if (!destination) {
			return;
		}
		// did not move anywhere - can bail early
		if (source.droppableId === destination.droppableId && source.index === destination.index) {
			return;
		}

		if (result.type === 'column') {
			return;
		}

		if (result.type === 'job') {
			setLoading(true);
			const sourceColumnId = result.source.droppableId.split('/')[1]; //	Source column id
			const destinationColumnId = result.destination.droppableId.split('/')[1]; //	Destination column id
			const sourceIndex = result.source.index; //	Source order index
			const destinationIndex = result.destination.index; //	Destination order index
			let sourceColumn = null;
			let destinationColumn = null;
			let jobsOfSourceColumn = [];
			let jobsOfDestinationColumn = [];
			let pushedJobs = [];
			let job = null;
			let cloneJob = null;

			if (!destinationColumnId) {
				setLoading(false);
				return;
			}
			//	If a job is moved from the columns except for the job pool
			if (sourceColumnId) {
				//	Source column
				// sourceColumn = Object.assign(
				// 	{},
				// 	storeBoardCloumns.find(item => item._id === sourceColumnId)
				// );
				sourceColumn = { ...storeBoardCloumns.find(item => item._id === sourceColumnId) };
				jobsOfSourceColumn = [...sourceColumn.jobs]; //	The jobs of the source column
				[job] = jobsOfSourceColumn.splice(sourceIndex, 1); // Remove the job from the source column and get the job.

				//	If a card move to the other position of the same column
				if (sourceColumnId === destinationColumnId) {
					pushedJobs = jobsOfSourceColumn.splice(destinationIndex); //	Get the jobs which should be located after the job.
					jobsOfSourceColumn.push(job, ...pushedJobs); // Insert the job into the destination by its index
					sourceColumn.jobs = jobsOfSourceColumn;
					dispatch(replaceColumns({ columnType, columns: [sourceColumn] })).then(() => {
						setLoading(false);
					});

					//	If a card move to the other position of the other column
				} else {
					let categoriesOfCloneJob = [];
					let destinationDueDate = null;
					let destinationUser = null;

					// cloneJob = Object.assign({}, job);
					cloneJob = { ...job };

					//	Destination column
					// destinationColumn = Object.assign(
					// 	{},
					// 	storeBoardCloumns.find(item => item._id === destinationColumnId)
					// );
					destinationColumn = { ...storeBoardCloumns.find(item => item._id === destinationColumnId) };
					jobsOfDestinationColumn = [...destinationColumn.jobs]; // The jobs of the destination column

					//	If the destination column already has the item which should be moved
					if (jobsOfDestinationColumn.find(item => item._id === cloneJob._id)) {
						setLoading(false);
						return;
					}
					pushedJobs = jobsOfDestinationColumn.splice(destinationIndex); //	Get the jobs which should be located after the job.
					switch (columnType) {
						case STATUS:
							// let destinationStatus = null;
							// destinationStatus = storeBoardCloumns.find(item => item._id === destinationColumnId);
							cloneJob.status = destinationColumnId;
							break;
						case CATEGORY:
							categoriesOfCloneJob = [...cloneJob.categories];
							categoriesOfCloneJob.splice(
								categoriesOfCloneJob.indexOf(sourceColumnId),
								1,
								destinationColumnId
							);
							cloneJob.categories = categoriesOfCloneJob;
							break;
						case DUE_DATE:
							destinationDueDate = storeBoardCloumns.find(item => item._id === destinationColumnId);
							cloneJob.dueDate = destinationDueDate;
							break;
						case USER:
							destinationUser = storeBoardCloumns.find(item => item._id === destinationColumnId);
							cloneJob.user = destinationUser;
							break;
						default:
							break;
					}
					jobsOfDestinationColumn.push(cloneJob, ...pushedJobs); //	Insert the job into the destination by its index
					sourceColumn.jobs = jobsOfSourceColumn;
					destinationColumn.jobs = jobsOfDestinationColumn;
					dispatch(
						replaceColumns({
							columnType,
							columns: [sourceColumn, destinationColumn],
							job: cloneJob
						})
					).then(({ payload }) => {
						if (payload) {
							dispatch(replaceJob(cloneJob));
							dispatch(
								showMessage({
									message: 'Job saved.',
									autoHideDuration: 2000,
									anchorOrigin: {
										vertical: 'top',
										horizontal: 'center'
									},
									variant: 'success'
								})
							);
						}
						setLoading(false);
					});
				}
			} else {
				//	If a job is moved from the job pool

				const jobId = result.draggableId.split('/')[1];
				let categoriesOfCloneJob = [];
				let destinationDueDate = null;
				let destinationUser = null;

				job = storeJobs.find(item => item._id === jobId);
				switch (columnType) {
					case STATUS:
						if (job.status) {
							setLoading(false);
							return;
						}
						break;
					case DUE_DATE:
						if (job.dueDate) {
							setLoading(false);
							return;
						}
						break;
					case USER:
						if (job.user) {
							setLoading(false);
							return;
						}
						break;
					default:
						break;
				}

				// cloneJob = Object.assign({}, job);
				cloneJob = { ...job };

				//	Destination column
				// destinationColumn = Object.assign(
				// 	{},
				// 	storeBoardCloumns.find(item => item._id === destinationColumnId)
				// );
				destinationColumn = { ...storeBoardCloumns.find(item => item._id === destinationColumnId) };
				jobsOfDestinationColumn = [...destinationColumn.jobs]; // The jobs of the destination column

				//	If the destination column already has the item which should be moved
				if (jobsOfDestinationColumn.find(item => item._id === cloneJob._id)) {
					setLoading(false);
					return;
				}
				pushedJobs = jobsOfDestinationColumn.splice(destinationIndex); //	Get the jobs which should be located after the job.
				switch (columnType) {
					case STATUS:
						// let destinationStatus = null;
						// destinationStatus = storeBoardCloumns.find(item => item._id === destinationColumnId);
						cloneJob.status = destinationColumnId;
						break;
					case CATEGORY:
						categoriesOfCloneJob = [...cloneJob.categories];
						categoriesOfCloneJob.push(destinationColumnId);
						cloneJob.categories = categoriesOfCloneJob;
						break;
					case DUE_DATE:
						destinationDueDate = storeBoardCloumns.find(item => item._id === destinationColumnId);
						cloneJob.dueDate = destinationDueDate;
						break;
					case USER:
						destinationUser = storeBoardCloumns.find(item => item._id === destinationColumnId);
						cloneJob.user = destinationUser;
						break;
					default:
						break;
				}
				jobsOfDestinationColumn.push(cloneJob, ...pushedJobs); //	Insert the job into the destination by its index
				destinationColumn.jobs = jobsOfDestinationColumn;
				dispatch(
					replaceColumns({
						columnType,
						columns: [destinationColumn],
						job: cloneJob
					})
				).then(({ payload }) => {
					if (payload) {
						dispatch(replaceJob(cloneJob));
						dispatch(
							showMessage({
								message: 'Job saved.',
								autoHideDuration: 2000,
								anchorOrigin: {
									vertical: 'top',
									horizontal: 'center'
								},
								variant: 'success'
							})
						);
					}
					setLoading(false);
				});
			}
		}
	};

	//	Change the columnType
	const handleColumnType = e => {
		setColumnType(e.target.value);
	};

	if (!board) {
		return null;
	}

	return (
		<div className="flex flex-1 flex-auto flex-col w-full h-full relative" ref={containerRef}>
			<AppBar position="static" color="primary" elevation={0}>
				<Toolbar className="flex items-center justify-between px-4 sm:px-24 h-48 sm:h-64 sm:h-96 container">
					<Hidden xsDown>
						<Button to="/tasks/boards/" component={Link} variant="contained" color="secondary">
							<Icon>assessment</Icon>
							<span className="px-8">Boards</span>
						</Button>
					</Hidden>

					<Hidden smUp>
						<IconButton color="inherit" to="/tasks/boards/" component={Link}>
							<Icon>assessment</Icon>
						</IconButton>
					</Hidden>

					<div className="flex flex-1 justify-center items-center">
						<BoardTitle board={board} />
					</div>

					<motion.div
						initial={{ y: 20, opacity: 0.8 }}
						animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
					>
						<TextField
							select
							value={columnType}
							onChange={handleColumnType}
							label="Sort by"
							margin="normal"
							variant="filled"
							className="rounded-md bg-white"
						>
							<MenuItem value="status">Status</MenuItem>
							<MenuItem value="dueDate">Due Date</MenuItem>
							<MenuItem value="category">Category</MenuItem>
							<MenuItem value="user">User</MenuItem>
						</TextField>
					</motion.div>

					<IconButton color="inherit" onClick={handleDeleteBoard}>
						<Icon>delete</Icon>
					</IconButton>
				</Toolbar>
			</AppBar>

			{loading ? (
				<FuseLoading />
			) : (
				<div className={clsx('flex flex-1 overflow-x-auto overflow-y-hidden')}>
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId="board" type="column" direction="horizontal">
							{provided => (
								<div ref={provided.innerRef} className="flex container py-16 md:py-24 px-8 md:px-12">
									{/* Job pool */}
									<JobPoolColumn
										columnType={columnType}
										nameEditable={false}
										boardColumn={{ name: 'Job Pool' }}
										jobs={storeJobs}
										index={0}
									/>

									{/* Columns */}
									{storeBoardCloumns.map((item, key) => (
										<BoardColumn
											key={key}
											nameEditable={!(columnType === USER || columnType === DUE_DATE)}
											boardColumn={item}
											jobs={item.jobs}
											columnType={columnType}
											index={key + 1}
										/>
									))}

									{provided.placeholder}

									{/* Add a column */}
									{columnType !== USER ? (
										<AddColumn columnType={columnType} columns={columns} setColumns={setColumns} />
									) : (
										<></>
									)}
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</div>
			)}

			<JobCardDialog columnType={columnType} />
			<DeleteConfirmDialog />
		</div>
	);
}

export default withReducer('tasks', reducer)(withRouter(Board));
