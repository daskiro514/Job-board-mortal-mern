import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import api from 'utils/api';
import { getRepairedMultipleData } from 'utils/functions';

export const getAll = createAsyncThunk('/components/getAll', async () => {
	const response = await api.get('/component/all');
	const data = await response.data;

	// Each element in 'data' have to have 'id' key. So rename '_id' to 'id'
	const repairedData = await getRepairedMultipleData(data);

	return repairedData;
});

const componentsAdapter = createEntityAdapter({});

export const { selectAll: selectComponents } = componentsAdapter.getSelectors(state => state.settings.components);

const componentsSlice = createSlice({
	name: 'settings/components',
	initialState: componentsAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[getAll.fulfilled]: componentsAdapter.setAll
	}
});

export default componentsSlice.reducer;
