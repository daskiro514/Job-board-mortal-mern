import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import api from 'utils/api';
import { getRepairedMultipleData } from 'utils/functions';

export const getAll = createAsyncThunk('/layouts/getAll', async () => {
	const response = await api.get('/layout/all');
	const data = await response.data;

	// Each element in 'data' have to have 'id' key. So rename '_id' to 'id'
	const repairedData = await getRepairedMultipleData(data);

	return repairedData;
});

const layoutsAdapter = createEntityAdapter({});

export const { selectAll: selectLayouts } = layoutsAdapter.getSelectors(state => state.settings.layouts);

const layoutsSlice = createSlice({
	name: 'settings/layouts',
	initialState: layoutsAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[getAll.fulfilled]: layoutsAdapter.setAll
	}
});

export default layoutsSlice.reducer;
