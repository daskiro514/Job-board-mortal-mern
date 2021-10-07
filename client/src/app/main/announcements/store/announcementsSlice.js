import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import api from 'utils/api';
import { getRepairedMultipleData, getRepairedSingleData } from 'utils/functions';

export const getAll = createAsyncThunk('/announcements/getAll', async () => {
	const response = await api.get('/announcement/all');
	const data = await response.data;

	// Each element in 'data' have to have 'id' key. So rename '_id' to 'id'
	const repairedData = await getRepairedMultipleData(data);
	return repairedData;
});

export const create = createAsyncThunk('/announcements/create', async newAnnouncementData => {
	const response = await api.post('/announcement/create', newAnnouncementData);
	const data = await response.data;
	const repairedData = await getRepairedSingleData(data);
	return repairedData;
});

const announcementsAdapter = createEntityAdapter({});

export const { selectAll: selectAnnouncements } = announcementsAdapter.getSelectors(
	state => state.announcements.announcements
);

const announcementsSlice = createSlice({
	name: 'announcements/announcements',
	initialState: announcementsAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[getAll.fulfilled]: announcementsAdapter.setAll
		// [create.fulfilled]: announcementsAdapter.addOne
	}
});

export default announcementsSlice.reducer;
