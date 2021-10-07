/**
 * Boards slice for store
 * Created at 2021/09/19
 * Created by Ilia L
 */

import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import api from 'utils/api';

//  Create a new board
export const createBoard = createAsyncThunk('/tasks/boards/create', async boardData => {
	const response = await api.post('board/create', boardData);
	const data = await response.data;
	return data;
});

//  Get the boards by job type
export const getBoardsByUserId = createAsyncThunk('/tasks/boards/userId', async userId => {
	const response = await api.get(`board/getByUserId/${userId}`);
	const data = await response.data;
	return data;
});

//	Rename the name of a board
export const renameBoard = createAsyncThunk('/tasks/boards/rename', async titleAndId => {
	const { title, _id } = titleAndId;
	const response = await api.put(`board/rename/${_id}`, { title });
	const data = await response.data;
	data.title = title;
	return data;
});

//	Delete a board by its object id
export const deleteBoard = createAsyncThunk('/tasks/boards/delete', async _id => {
	const response = await api.delete(`board/delete/${_id}`);
	const data = await response.data;
	return _id;
});

const boardsAdapter = createEntityAdapter({
	selectId: board => board._id
});

export const { selectAll: selectBoards } = boardsAdapter.getSelectors(state => state.tasks.boards);

const boardsSlice = createSlice({
	name: 'tasks/boards',
	initialState: boardsAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[createBoard.fulfilled]: boardsAdapter.addOne,
		[getBoardsByUserId.fulfilled]: boardsAdapter.setAll,
		[renameBoard.fulfilled]: boardsAdapter.upsertOne,
		[deleteBoard.fulfilled]: boardsAdapter.removeOne
	}
});

export default boardsSlice.reducer;
