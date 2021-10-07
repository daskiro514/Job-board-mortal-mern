import { combineReducers } from '@reduxjs/toolkit';
import announcements from './announcementsSlice';

const reducer = combineReducers({
	announcements
});

export default reducer;
