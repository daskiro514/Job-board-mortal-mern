import { combineReducers } from '@reduxjs/toolkit';
import jobs from './jobsSlice';
// import boardFields from './boardFieldsSlice';
import boards from './boardsSlice';
import boardColumns from './boardColumnsSlice';
import jobCardDialog from './jobCardDialogSlice';

const JobBoardAppReducers = combineReducers({
	jobs,
	jobCardDialog,
	boards,
	boardColumns
});

export default JobBoardAppReducers;
