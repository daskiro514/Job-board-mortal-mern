/**
 * Add column component of the board page
 * Created at 2021/09/20
 * Created by Ilia L
 */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import * as yup from 'yup';
import _ from '@lodash';
import { showMessage } from 'app/store/fuse/messageSlice';
import { createBoardColumn } from '../store/boardColumnsSlice';

const useStyles = makeStyles(theme => ({
	card: {
		backgroundColor: darken(theme.palette.background.paper, theme.palette.type === 'light' ? 0.02 : 0.25)
	}
}));

const defaultValues = {
	name: ''
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	name: yup.string().required('You must enter a name')
});

/**
 * Main Component
 */
function AddColumn(props) {
	const { columnType, columns, setColumns } = props;
	const dispatch = useDispatch();

	const classes = useStyles(props);
	const [formOpen, setFormOpen] = useState(false);
	const { control, formState, handleSubmit, reset } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	useEffect(() => {
		if (!formOpen) {
			reset(defaultValues);
		}
	}, [formOpen, reset]);

	const handleOpenForm = ev => {
		ev.stopPropagation();
		setFormOpen(true);
	};

	const handleCloseForm = () => {
		setFormOpen(false);
	};

	const onSubmit = data => {
		if (columnType === 'dueDate') {
			if (columns.find(item => item.name.split('T')[0] === data.name)) {
				dispatch(
					showMessage({
						message: 'That column is already existed. Try again with the other name.',
						autoHideDuration: 2000,
						anchorOrigin: {
							vertical: 'top',
							horizontal: 'center'
						},
						variant: 'error'
					})
				);
			} else {
				dispatch(createBoardColumn({ newData: data, columnType })).then(action => {
					if (action.payload) {
						dispatch(
							showMessage({
								message: 'Success!',
								autoHideDuration: 2000,
								anchorOrigin: {
									vertical: 'top',
									horizontal: 'center'
								},
								variant: 'success'
							})
						);
						setColumns([...columns, action.payload]);
					} else {
						dispatch(
							showMessage({
								message: 'Error!',
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
			}
		} else {
			dispatch(createBoardColumn({ newData: data, columnType })).then(action => {
				if (action.payload) {
					dispatch(
						showMessage({
							message: 'Success!',
							autoHideDuration: 2000,
							anchorOrigin: {
								vertical: 'top',
								horizontal: 'center'
							},
							variant: 'success'
						})
					);
					setColumns([...columns, action.payload]);
				} else {
					dispatch(
						showMessage({
							message: 'Error!',
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
		}
		handleCloseForm();
	};

	return (
		<div>
			<Card className={clsx(classes.card, 'w-320 mx-8 sm:mx-12 rounded-20 shadow')} square>
				{formOpen ? (
					<ClickAwayListener onClickAway={handleCloseForm}>
						<form className="p-16" onSubmit={handleSubmit(onSubmit)}>
							<Controller
								name="name"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										type={columnType === 'dueDate' ? 'date' : 'text'}
										className="mb-16"
										required
										fullWidth
										variant="filled"
										label="Field name"
										autoFocus
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton onClick={handleCloseForm}>
														<Icon className="text-18">close</Icon>
													</IconButton>
												</InputAdornment>
											)
										}}
									/>
								)}
							/>

							<div className="flex justify-between items-center">
								<Button
									variant="contained"
									color="secondary"
									type="submit"
									disabled={_.isEmpty(dirtyFields) || !isValid}
								>
									Add
								</Button>
							</div>
						</form>
					</ClickAwayListener>
				) : (
					<Button
						onClick={handleOpenForm}
						classes={{
							root: 'font-medium w-full rounded-none h-64 px-16',
							label: 'justify-start'
						}}
					>
						<Icon className="text-32 text-red">add_circle</Icon>
						<span className="mx-8">Add a {columnType}</span>
					</Button>
				)}
			</Card>
		</div>
	);
}

export default AddColumn;
