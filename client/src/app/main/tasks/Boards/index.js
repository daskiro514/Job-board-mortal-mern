/**
 * Boards page
 * Created at 2021/09/15
 * Created by Ilia L
 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import PageHeader from 'app/shared-components/PageHeader';
import BoardsContent from './BoardsContent';

const useStyles = makeStyles(theme => ({
	root: {},
	board: {
		cursor: 'pointer',
		transitionProperty: 'box-shadow border-color',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	newBoard: {}
}));

function Boards() {
	return (
		<FusePageSimple
			header={
				<PageHeader
					title="Boards"
					breadCrumb={{ pageName: 'Dashboard', linkTo: '/dashboard' }}
					icon="assignment_turned_in"
				/>
			}
			content={<BoardsContent />}
		/>
	);
}

export default Boards;
