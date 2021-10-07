/**
 * The header component of the board field
 * Created at 2021/09/17
 * Created by Ilia L
 */
import React, { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import _ from '@lodash';
import { DUE_DATE, STATUS } from 'utils/constants';
import { showMessage } from 'app/store/fuse/messageSlice';
import {
	deleteBoardColumn,
	removeColumn,
	renameBoardColumn,
	resetAllColumns,
	selectBoardColumns
} from '../../store/boardColumnsSlice';
import { replaceSomeJobs } from '../../store/jobsSlice';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	name: yup.string().required('You must enter a name')
});

function BoardColumnHeader(props) {
	const dispatch = useDispatch();
	const storeBoardCloumns = useSelector(selectBoardColumns);
	const { boardColumn, columnType, nameEditable } = props;
	const [anchorEl, setAnchorEl] = useState(null);
	const [formOpen, setFormOpen] = useState(false);

	const { control, formState, handleSubmit, reset } = useForm({
		mode: 'onChange',
		defaultValues: {
			name: ''
		},
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	useEffect(() => {
		if (!formOpen) {
			reset({
				name: boardColumn.name.split('T')[0]
			});
		}
	}, [formOpen, reset, boardColumn.name]);

	useEffect(() => {
		if (formOpen && anchorEl) {
			setAnchorEl(null);
		}
	}, [anchorEl, formOpen]);

	const handleMenuClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleOpenForm = e => {
		e.stopPropagation();
		if (nameEditable) {
			setFormOpen(true);
		}
	};

	const handleCloseForm = () => {
		setFormOpen(false);
	};

	const onSubmit = data => {
		dispatch(renameBoardColumn({ columnType, name: data.name, _id: boardColumn._id })).then(action => {
			if (action.payload) {
				dispatch(
					showMessage({
						message: 'Column name saved.',
						autoHideDuration: 2000,
						anchorOrigin: {
							vertical: 'top',
							horizontal: 'center'
						},
						variant: 'success'
					})
				);
			} else {
				dispatch(
					showMessage({
						message: 'Server Error! Try again with other name.',
						autoHideDuration: 2000,
						anchorOrigin: {
							vertical: 'top',
							horizontal: 'center'
						},
						variant: 'error'
					})
				);
			}
		});
		handleCloseForm();
	};

	const handleDeleteBoardField = () => {
		dispatch(deleteBoardColumn({ columnType, _id: boardColumn._id })).then(async ({ payload }) => {
			if (payload) {
				//	If the columnType is status
				if (columnType === STATUS) {
					await dispatch(replaceSomeJobs(payload));
					await dispatch(removeColumn(boardColumn._id));
				} else {
					//	If the columnType is category
					await dispatch(replaceSomeJobs(payload.jobs));
					await dispatch(resetAllColumns(payload.columns));
				}
				await dispatch(
					showMessage({
						message: 'The column has been DELETED.',
						autoHideDuration: 2000,
						anchorOrigin: {
							vertical: 'top',
							horizontal: 'center'
						},
						variant: 'success'
					})
				);
			}
		});
	};

	return (
		<div {...props.handleProps}>
			<div className="flex items-center justify-between h-48 sm:h-64 px-8">
				<div className="flex items-center min-w-0 px-12">
					{formOpen ? (
						<ClickAwayListener onClickAway={handleCloseForm}>
							<form className="flex w-full" onSubmit={handleSubmit(onSubmit)}>
								<Controller
									name="name"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											type={columnType === DUE_DATE ? 'date' : 'text'}
											variant="outlined"
											margin="none"
											autoFocus
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															type="submit"
															disabled={_.isEmpty(dirtyFields) || !isValid}
														>
															<Icon>check</Icon>
														</IconButton>
													</InputAdornment>
												)
											}}
										/>
									)}
								/>
							</form>
						</ClickAwayListener>
					) : (
						<Typography className="text-16 font-medium cursor-pointer" onClick={handleOpenForm}>
							{columnType === 'dueDate' ? boardColumn.name.split('T')[0] : boardColumn.name}
						</Typography>
					)}
				</div>
				{nameEditable ? (
					<div className="">
						<IconButton
							aria-owns={anchorEl ? 'actions-menu' : null}
							aria-haspopup="true"
							onClick={handleMenuClick}
							variant="outlined"
							size="small"
						>
							<Icon className="text-20">more_vert</Icon>
						</IconButton>
						<Menu id="actions-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
							{columnType !== DUE_DATE ? (
								<MenuItem onClick={handleDeleteBoardField}>
									<ListItemIcon className="min-w-40">
										<Icon>delete</Icon>
									</ListItemIcon>
									<ListItemText primary="Remove List" />
								</MenuItem>
							) : (
								<></>
							)}
							<MenuItem onClick={handleOpenForm}>
								<ListItemIcon className="min-w-40">
									<Icon>edit</Icon>
								</ListItemIcon>
								<ListItemText primary="Rename List" />
							</MenuItem>
						</Menu>
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}

export default BoardColumnHeader;
