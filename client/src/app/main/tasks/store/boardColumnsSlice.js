/**
 * Board columns slice for store
 * Created at 2021/09/20
 * Created by Ilia L
 */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import api from 'utils/api';
import { STATUS, CATEGORY, USER, DUE_DATE } from 'utils/constants';
import { addCategory, addStatus, removeCategory, removeStatus } from './jobCardDialogSlice';

//  Create a new board column
export const createBoardColumn = createAsyncThunk('/tasks/boardColumns/create', async (data, { dispatch }) => {
	const { columnType, newData } = data;
	const response = await api.post(`${generateApiByColumnType(columnType)}/create`, newData);
	const resData = await response.data;
	if (columnType === STATUS) {
		await dispatch(addStatus(resData));
	}
	if (columnType === CATEGORY) {
		await dispatch(addCategory(resData));
	}
	return resData;
});

// //  Get all board columns
// export const getAllBoardColumns = createAsyncThunk('/tasks/boardColumns/getAll', async columnType => {
// 	const response = await api.get(`${generateApiByColumnType(columnType)}/getAll`);
// 	const data = await response.data;
// 	return data;
// });

//	Rename the name of a board column
export const renameBoardColumn = createAsyncThunk('/tasks/boardColumns/rename', async data => {
	const { columnType, name, _id } = data;
	const response = await api.put(`${generateApiByColumnType(columnType)}/rename/${_id}`, { name });
	const resData = await response.data;
	resData.name = name;
	return resData;
});

//	Delete a board column by its object id
export const deleteBoardColumn = createAsyncThunk('/tasks/boardColumns/delete', async (data, { dispatch }) => {
	const { columnType, _id } = data;
	const response = await api.delete(`${generateApiByColumnType(columnType)}/delete/${_id}`);
	const resData = await response.data;
	if (columnType === STATUS) {
		await dispatch(removeStatus(_id));
	}
	if (columnType === CATEGORY) {
		await dispatch(removeCategory(_id));
	}
	return resData;
});

//	Get all job statuses
export const getAllJobStatuses = createAsyncThunk('/tasks/boardColumns/getAllJobStatuses', async () => {
	const response = await api.get('/jobStatus/getAll');
	const resData = await response.data;
	return resData;
});

//	Get all job categories
export const getAllJobCategories = createAsyncThunk('/tasks/boardColumns/getAllJobCategories', async () => {
	const response = await api.get('/jobCategory/getAll');
	const resData = await response.data;
	return resData;
});

//	Get all job due dates
export const getAllJobDueDates = createAsyncThunk('/tasks/boardColumns/getAllJobDueDates', async () => {
	const response = await api.get('/jobDueDate/getAll');
	const resData = await response.data;
	return resData;
});

//	Get all users
export const getAllUsers = createAsyncThunk('/tasks/boardColumns/getAllUsers', async () => {
	const response = await api.get('/user/getAll');
	const resData = await response.data;
	return resData;
});

//	Replace
export const replaceColumns = createAsyncThunk('/tasks/boardColumns/replaceColumns', async (data, { dispatch }) => {
	const { columnType, columns, job } = data;
	let cloneJob = null;

	if (job) {
		cloneJob = { ...job };

		if (job.dueDate) {
			cloneJob.dueDate = job.dueDate._id;
		}
		if (job.user) {
			cloneJob.user = job.user._id;
		}
	}
	const response = await api.put(`${generateApiByColumnType(columnType)}/changeJobs`, { columns, job: cloneJob });
	const resData = await response.data;

	return resData;
});

//	Reset all columns without integration with the backend
export const resetAllColumns = createAsyncThunk('/tasks/boardColumns/resetAllColumns', async data => {
	return data;
});

//	Remove a board column from the store
export const removeColumn = createAsyncThunk('/tasks/boardColumns/removeColumn', async data => {
	return data;
});

//  Generate api by its columnType (The columnType can be just 'status' or 'category'.)
const generateApiByColumnType = columnType => {
	switch (columnType) {
		case STATUS:
			return 'jobStatus';
		case CATEGORY:
			return 'jobCategory';
		case DUE_DATE:
			return 'jobDueDate';
		case USER:
			return 'user';
		default:
			break;
	}
	return null;
};

const boardColumnsAdapter = createEntityAdapter({
	selectId: boardColumn => boardColumn._id
});

export const { selectAll: selectBoardColumns } = boardColumnsAdapter.getSelectors(state => state.tasks.boardColumns);

const boardColumnsSlice = createSlice({
	name: 'tasks/boardColumns',
	initialState: boardColumnsAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[createBoardColumn.fulfilled]: boardColumnsAdapter.addOne,
		// [getAllBoardColumns.fulfilled]: boardColumnsAdapter.setAll,
		[getAllJobStatuses.fulfilled]: boardColumnsAdapter.setAll,
		[getAllJobCategories.fulfilled]: boardColumnsAdapter.setAll,
		[getAllJobDueDates.fulfilled]: boardColumnsAdapter.setAll,
		[getAllUsers.fulfilled]: boardColumnsAdapter.setAll,
		[resetAllColumns.fulfilled]: boardColumnsAdapter.setAll,
		[renameBoardColumn.fulfilled]: boardColumnsAdapter.upsertOne,
		[replaceColumns.fulfilled]: boardColumnsAdapter.upsertMany,
		[removeColumn.fulfilled]: boardColumnsAdapter.removeOne
	}
});

export default boardColumnsSlice.reducer;
