import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import api from 'utils/api';
import { getRepairedMultipleData } from 'utils/functions';

export const getAll = createAsyncThunk('/userGroups/getAll', async () => {
	const response = await api.get('/userGroup/all');
	const data = await response.data;

	// Each element in 'data' have to have 'id' key. So rename '_id' to 'id'
	const repairedData = await getRepairedMultipleData(data);

	return repairedData;
});

const userGroupsAdapter = createEntityAdapter({});

export const { selectAll: selectUserGroups } = userGroupsAdapter.getSelectors(state => state.settings.userGroups);

const userGroupsSlice = createSlice({
	name: 'settings/userGroups',
	initialState: userGroupsAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {
		[getAll.fulfilled]: userGroupsAdapter.setAll
	}
});

export default userGroupsSlice.reducer;
