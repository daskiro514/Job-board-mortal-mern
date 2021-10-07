/**
 * The title of the board page
 * Created at 2021/09/19
 * Created by Ilia L
 */
import React, { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import _ from '@lodash';
import { renameBoard } from '../store/boardsSlice';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	title: yup.string().required('You must enter a title')
});

function BoardTitle(props) {
	const dispatch = useDispatch();
	const { board } = props;

	const [formOpen, setFormOpen] = useState(false);
	const [title, setTitle] = useState(board.title);

	const { control, formState, handleSubmit, reset } = useForm({
		mode: 'onChange',
		defaultValues: { title },
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	useEffect(() => {
		if (!formOpen) {
			reset({ title });
		}
	}, [formOpen, reset, title]);

	const handleOpenForm = ev => {
		ev.stopPropagation();
		setFormOpen(true);
	};

	const handleCloseForm = () => {
		setFormOpen(false);
	};

	function onSubmit(data) {
		dispatch(renameBoard({ title: data.title, _id: board._id })).then(() => setTitle(data.title));
		handleCloseForm();
	}

	return (
		<div className="flex items-center min-w-0">
			{formOpen ? (
				<ClickAwayListener onClickAway={handleCloseForm}>
					<Paper>
						<form className="flex w-full" onSubmit={handleSubmit(onSubmit)}>
							<Controller
								name="title"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										variant="filled"
										margin="none"
										autoFocus
										hiddenLabel
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
					</Paper>
				</ClickAwayListener>
			) : (
				<div className="flex items-center justify-center">
					<Typography
						className="text-14 sm:text-18 font-medium cursor-pointer mx-8"
						onClick={handleOpenForm}
						color="inherit"
					>
						{title}
					</Typography>
				</div>
			)}
		</div>
	);
}

export default BoardTitle;
