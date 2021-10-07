/**
 * Add a card in the job pool column
 * Created at 2021/09/29
 * Created by Ilia L
 */
import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import _ from '@lodash';
import { showMessage } from 'app/store/fuse/messageSlice';

import { createJob } from '../../store/jobsSlice';

const defaultValues = {
	title: ''
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	title: yup.string().required('You must enter a title')
});

function AddJobCard(props) {
	const dispatch = useDispatch();
	// const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);

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

	function onSubmit(data) {
		dispatch(createJob(data)).then(() => {
			dispatch(
				showMessage({
					message: 'A JOB has been CREATED successfully.',
					autoHideDuration: 2000,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'center'
					},
					variant: 'success'
				})
			);
		});
		handleCloseForm();
	}

	return (
		<div className="w-full border-t-1">
			{formOpen ? (
				<ClickAwayListener onClickAway={handleCloseForm}>
					<form className="p-16" onSubmit={handleSubmit(onSubmit)}>
						<Controller
							name="title"
							control={control}
							render={({ field }) => (
								<TextField
									className="mb-16"
									required
									fullWidth
									variant="filled"
									label="Card title"
									autoFocus
									InputProps={{
										...field,
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
						root: 'font-medium w-full px-16 rounded-none h-48',
						label: 'justify-start'
					}}
				>
					<Icon className="text-20">add</Icon>
					<span className="mx-8">Add a card</span>
				</Button>
			)}
		</div>
	);
}

export default AddJobCard;
