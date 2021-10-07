/**
 * The dialog to confirm the delete a job card
 * Created at 2021/09/30
 * Created by Ilia L
 */

import React from 'react';
import { Dialog, Button, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from 'app/store/fuse/deleteConfirmDialogSlice';
import { showMessage } from 'app/store/fuse/messageSlice';

function DeleteConfirmDialog() {
	const dispatch = useDispatch();
	const isOpened = useSelector(({ fuse }) => fuse.deleteConfirmDialog.isOpened);
	const deleteFunc = useSelector(({ fuse }) => fuse.deleteConfirmDialog.deleteFunc);

	//  Close the dialog
	const handleClose = e => {
		dispatch(closeDialog());
	};

	// handle Delete
	const handleDelete = async e => {
		await e.preventDefault();
		await dispatch(deleteFunc);
		await dispatch(
			showMessage({
				message: 'Job has been removed.',
				autoHideDuration: 2000,
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'center'
				},
				variant: 'success'
			})
		);
		await dispatch(closeDialog());
	};
	return (
		<Dialog
			open={isOpened}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">Delete</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">Are you sure?</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleDelete} autoFocus>
					Okay
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default DeleteConfirmDialog;
