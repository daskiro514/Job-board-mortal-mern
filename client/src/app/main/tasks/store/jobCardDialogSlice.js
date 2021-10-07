/**
 * The slice for the job card dialog
 * Created at 2021/09/29
 * Created by Ilia L
 */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from 'utils/api';

export const getAllBoardColumnsExceptDueDate = createAsyncThunk(
	'/tasks/jobCardDialog/getAllBoardColumnsExceptDueDate',
	async () => {
		const response = await api.get('job/getAllBoardColumnsExceptDueDate');
		const resData = await response.data;
		console.log(resData);
		return resData;
	}
);

const jobCardDialogSlice = createSlice({
	name: 'tasks/jobCardDialog',
	initialState: {
		dialogOpen: false,
		data: null,
		statuses: [],
		categories: []
	},
	reducers: {
		openJobCardDialog: (state, action) => {
			state.dialogOpen = true;
			state.data = action.payload;
		},
		closeJobCardDialog: (state, action) => {
			state.dialogOpen = false;
			state.data = null;
		},
		addStatus: (state, action) => {
			state.statuses.push(action.payload);
		},
		addCategory: (state, action) => {
			state.categories.push(action.payload);
		},
		removeStatus: (state, action) => {
			state.statuses.splice(state.statuses.indexOf(state.statuses.find(item => item._id === action.payload)), 1);
		},
		removeCategory: (state, action) => {
			console.log(action.payload);
			state.categories.splice(
				state.categories.indexOf(state.categories.find(item => item._id === action.payload)),
				1
			);
		},
		replaceStatus: (state, action) => {
			state.statuses.splice(
				state.statuses.indexOf(state.statuses.find(item => item._id === action.payload._id)),
				1,
				action.payload
			);
		},
		replaceCategory: (state, action) => {
			state.categories.splice(
				state.categories.indexOf(state.categories.find(item => item._id === action.payload._id)),
				1,
				action.payload
			);
		}
	},
	extraReducers: {
		[getAllBoardColumnsExceptDueDate.fulfilled]: (state, { payload }) => {
			const { statuses, categories, users } = payload;
			state.statuses = statuses;
			state.categories = categories;
			state.users = users;
		}
	}
});

export const {
	openJobCardDialog,
	closeJobCardDialog,
	addStatus,
	addCategory,
	replaceStatus,
	replaceCategory,
	removeStatus,
	removeCategory
} = jobCardDialogSlice.actions;
export default jobCardDialogSlice.reducer;
