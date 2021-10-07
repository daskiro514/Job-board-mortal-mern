/**
 * Board fields slice for store
 * Created at 2021/09/17
 * Created by Ilia L
 */

import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import api from 'utils/api';

//  Create a new board field
export const createBoardField = createAsyncThunk('/tasks/boardFields/create', async newBoardFieldData => {
	const response = await api.post('boardField/create', newBoardFieldData);
	const data = await response.data;
	return data;
});

//  Get the board fields by job type
export const getBoardFieldsByJobType = createAsyncThunk('/tasks/boardFields/getByJobType', async jobType => {
	const response = await api.get(`boardField/getByJobType/${jobType}`);
	const data = await response.data;
	return data;
});

//	Rename the name of a board field
export const renameBoardField = createAsyncThunk('/tasks/boardFields/rename', async nameAndId => {
	const { name, _id } = nameAndId;
	const response = await api.put(`boardField/rename/${_id}`, { name });
	const data = await response.data;
	data.name = name;
	return data;
});

//	Delete a board field by its object id
export const deleteBoardField = createAsyncThunk('/tasks/boardFields/delete', async id => {
	const response = await api.delete(`boardField/delete/${id}`);
	const data = await response.data;
	return id;
});

const boardFieldsAdapter = createEntityAdapter({
	selectId: boardField => boardField._id
});

export const { selectAll: selectBoardFields } = boardFieldsAdapter.getSelectors(state => state.tasks.boardFields);

const boardFieldsSlice = createSlice({
	name: 'tasks/boardFields',
	initialState: boardFieldsAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[createBoardField.fulfilled]: boardFieldsAdapter.addOne,
		[getBoardFieldsByJobType.fulfilled]: boardFieldsAdapter.setAll,
		[renameBoardField.fulfilled]: boardFieldsAdapter.upsertOne,
		[deleteBoardField.fulfilled]: boardFieldsAdapter.removeOne
	}
});

export default boardFieldsSlice.reducer;
