/**
 * 'Announcments' page
 * Created at
 * Created by Ilia L
 */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import { fade } from '@material-ui/core/styles/colorManipulator';
import reducer from 'app/main/announcements/store';
import FuseLoading from '@fuse/core/FuseLoading';
import withReducer from 'app/store/withReducer';
import AnnouncementCard from './AnnouncementCard';
import { getAll, selectAnnouncements } from './store/announcementsSlice';

/**
 * The styles for the main component
 */
const drawerWidth = 400;
const headerHeight = 200;
const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'row',
		minHeight: '100%',
		position: 'relative',
		flex: '1 1 auto',
		height: 'auto',
		backgroundColor: theme.palette.background.default
	},
	topBg: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: headerHeight,
		backgroundImage: 'url("../../assets/images/backgrounds/header-bg.png")',
		backgroundColor: theme.palette.primary.dark,
		backgroundSize: 'cover',
		pointerEvents: 'none'
	},
	contentCardWrapper: {
		position: 'relative',
		padding: 24,
		maxWidth: 1400,
		display: 'flex',
		flexDirection: 'column',
		flex: '1 0 auto',
		width: '100%',
		minWidth: '0',
		maxHeight: '100%',
		margin: '0 auto',
		[theme.breakpoints.down('sm')]: {
			padding: 16
		},
		[theme.breakpoints.down('xs')]: {
			padding: 12
		}
	},
	contentCard: {
		display: 'flex',
		position: 'relative',
		flex: '1 1 100%',
		flexDirection: 'row',
		backgroundImage: 'url("/assets/images/patterns/rain-grey.png")',
		backgroundColor: theme.palette.background.paper,
		minHeight: 0,
		overflow: 'hidden'
	},
	drawerPaper: {
		width: drawerWidth,
		maxWidth: '100%',
		overflow: 'hidden',
		height: '100%',
		[theme.breakpoints.up('md')]: {
			position: 'relative'
		}
	},
	contentWrapper: {
		display: 'flex',
		flexDirection: 'column',
		flex: '1 1 100%',
		zIndex: 10,
		background: `linear-gradient(to bottom, ${fade(theme.palette.background.paper, 0.8)} 0,${fade(
			theme.palette.background.paper,
			0.6
		)} 20%,${fade(theme.palette.background.paper, 0.8)})`
	},
	content: {
		display: 'flex',
		flex: '1 1 100%',
		minHeight: 0
	}
}));

/**
 * Main Component
 */
function Announcements(props) {
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const storeAnnouncements = useSelector(selectAnnouncements);

	const [announcements, setAnnouncements] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		dispatch(getAll()).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		setAnnouncements(storeAnnouncements);
	}, [storeAnnouncements]);

	if (announcements.length === 0 && loading === false) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There are no announcements!
				</Typography>
			</motion.div>
		);
	}

	if (loading) {
		return <FuseLoading />;
	}

	return (
		<div className={clsx(classes.root)}>
			<div className={classes.topBg} />
			<div className={clsx(classes.contentCardWrapper, 'container')}>
				{announcements
					? announcements.map((announcement, i) => <AnnouncementCard announcement={announcement} key={i} />)
					: ''}
			</div>
		</div>
	);
}

export default withReducer('announcements', reducer)(Announcements);
