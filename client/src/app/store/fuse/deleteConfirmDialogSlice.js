/**
 * The slice for the delete confirm dialog
 * Created at 2021/09/30
 * Created by Ilia L
 */
import { createSlice } from '@reduxjs/toolkit';

const deleteConfirmDialogSlice = createSlice({
	name: 'dialog',
	initialState: {
		isOpened: false,
		deleteFunc: null
	},
	reducers: {
		openDialog: (state, action) => {
			state.isOpened = true;
			state.deleteFunc = action.payload;
		},
		closeDialog: (state, action) => {
			state.isOpened = false;
		}
	}
});

export const { openDialog, closeDialog } = deleteConfirmDialogSlice.actions;

export default deleteConfirmDialogSlice.reducer;
