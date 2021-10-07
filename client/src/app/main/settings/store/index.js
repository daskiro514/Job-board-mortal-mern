import { combineReducers } from '@reduxjs/toolkit';
import userGroups from './userGroupsSlice';
import profile from './profileSlice';
import layouts from './layoutsSlice';
import components from './componentsSlice';

const reducer = combineReducers({
	userGroups,
	profile,
	layouts,
	components
});

export default reducer;
