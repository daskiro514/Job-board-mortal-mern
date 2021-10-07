/**
 * Jobs slice for store
 * Created at 2021/09/16
 * Created by Ilia L
 */

import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import api from 'utils/api';
import { resetAllColumns } from './boardColumnsSlice';

//	Create a job
export const createJob = createAsyncThunk('/tasks/jobs/createJob', async data => {
	const response = await api.post('job/create', data);
	const resData = await response.data;
	return resData;
});

//	Get all jobs
export const getAllJobs = createAsyncThunk('/tasks/jobs/getAllJobs', async () => {
	const response = await api.get('job/getAll');
	const data = await response.data;
	return data;
});

//  Get the jobs by each board from the server
export const getJobsByBoard = createAsyncThunk('/tasks/jobs/getJobsByBoard', async boardName => {
	const response = await api.get(`job/getByJobType/${boardName}`);
	const data = await response.data;
	return data;
});

//	Change a status of a job
export const changeJobStatus = createAsyncThunk('/tasks/jobs/changeJobStatus', async data => {
	const { _id, oldStatusId, newStatusId } = data;
	const response = await api.put(`job/changeStatus/${_id}`, { oldStatusId, newStatusId });
	const resData = await response.data;
	return resData;
});

//	Change a category of a job
export const changeJobCategory = createAsyncThunk('/tasks/jobs/changeJobCategory', async data => {
	const { _id, oldCategoryId, newCategoryId } = data;
	const response = await api.put(`job/changeCategory/${_id}`, { oldCategoryId, newCategoryId });
	const resData = await response.data;
	return resData;
});

//	Change the due date of a job
export const changeJobDueDate = createAsyncThunk('/tasks/jobs/changeJobDueDate', async data => {
	const { _id, newDueDate } = data;
	const response = await api.put(`job/changeDueDate/${_id}`, { newDueDate });
	const resData = await response.data;
	return resData;
});

//	Change the assigned user of a job
export const changeJobUser = createAsyncThunk('/tasks/jobs/changeJobUser', async data => {
	const { _id, newUserId } = data;
	const response = await api.put(`job/changeUser/${_id}`, { newUserId });
	const resData = await response.data;
	return resData;
});

//	Replace a job
export const replaceJob = createAsyncThunk('/tasks/jobs/replaceJob', async data => {
	return data;
});

//	Update the title and the description of the job
export const updateJob = createAsyncThunk('/tasks/jobs/updateJob', async data => {
	const { _id, title, description, columnType } = data;
	const response = await api.put(`job/update/${_id}`, { title, description, columnType });
	const resData = await response.data;
	resData.job.title = title;
	resData.job.description = description;
	return resData;
});

//	Delete a job
export const deleteJob = createAsyncThunk('/tasks/jobs/deleteJob', async (data, { dispatch }) => {
	const { _id, columnData } = data;
	const response = await api.put(`job/delete/${_id}`, columnData);
	const resData = await response.data;
	dispatch(resetAllColumns(resData.boardColumns));
	return resData;
});

// Replace some jobs
export const replaceSomeJobs = createAsyncThunk('/tasks/jobs/replaceSomeJobs', async data => {
	console.log(data);
	return data;
});

const jobsAdapter = createEntityAdapter({
	selectId: job => job._id
});

export const { selectAll: selectJobs } = jobsAdapter.getSelectors(state => state.tasks.jobs);

const jobsSlice = createSlice({
	name: 'tasks/jobs',
	initialState: jobsAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[createJob.fulfilled]: jobsAdapter.addOne,
		[getJobsByBoard.fulfilled]: jobsAdapter.setAll,
		[getAllJobs.fulfilled]: jobsAdapter.setAll,
		[changeJobStatus.fulfilled]: jobsAdapter.upsertOne,
		[changeJobCategory.fulfilled]: jobsAdapter.upsertOne,
		[changeJobDueDate.fulfilled]: jobsAdapter.upsertOne,
		[changeJobUser.fulfilled]: jobsAdapter.upsertOne,
		[replaceJob.fulfilled]: jobsAdapter.setOne,
		[replaceSomeJobs.fulfilled]: jobsAdapter.setMany,
		[updateJob.fulfilled]: (state, { payload }) => {
			const { job } = payload;
			jobsAdapter.upsertOne(state, job);
		},
		[deleteJob.fulfilled]: (state, { payload }) => {
			const { jobId, job } = payload;
			if (jobId) {
				jobsAdapter.removeOne(state, jobId);
			}
			if (job) {
				jobsAdapter.setOne(state, job);
			}
		}
	}
});

export default jobsSlice.reducer;
