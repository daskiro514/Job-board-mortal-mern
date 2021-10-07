import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { setUserData } from 'app/auth/store/userSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import api from 'utils/api';
import { convertUserdataToFuseType, getRepairedSingleData } from 'utils/functions';

export const updateProfile = createAsyncThunk('/profile/update', async (dataToUpdate, store) => {
	const response = await api.put(`/user/updateProfile/${dataToUpdate.userId}`, dataToUpdate.profileData);
	const data = await response.data;
	
	//	Reset the current user info by the updated profile info.
	const convertedUserdata = await convertUserdataToFuseType(data);
	await store.dispatch(setUserData(convertedUserdata));

	const repairedData = await getRepairedSingleData(data);
	await store.dispatch(
		showMessage({
			message: 'Settings update success!',
			autoHideDuration: 2000,
			anchorOrigin: {
				vertical: 'top',
				horizontal: 'center'
			},
			variant: 'success'
		})
	);
	return repairedData;
});

const profileAdapter = createEntityAdapter({});

export const { selectAll: selectProfile } = profileAdapter.getSelectors(state => state.settings.profile);

const profileSlice = createSlice({
	name: 'settings/profile',
	initialState: profileAdapter.getInitialState({}),
	reducers: {},
	extraReducers: {}
});

export default profileSlice.reducer;
