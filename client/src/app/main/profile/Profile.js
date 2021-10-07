import FuseLoading from '@fuse/core/FuseLoading';
import { Box, Icon, IconButton, makeStyles, Paper, Typography } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import configPaths from 'utils/configPaths';

/**
 * Styles for main component
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
	},
	profileHeader: {
		height: '25rem',
		width: '100%',
		objectFit: 'cover',
		position: 'relative',
		zIndex: 1,
		borderTopLeftRadius: '1rem',
		borderTopRightRadius: '1rem'
	},
	profilePicture: {
		position: 'absolute',
		zIndex: 2,
		height: '20rem',
		marginLeft: 'auto',
		marginRight: 'auto',
		left: 0,
		right: 0,
		textAlign: 'center',
		top: '5rem',
		borderRadius: '9999px',
		border: '3px solid white'
	},
	settingsButton: {
		position: 'absolute',
		top: '2rem',
		zIndex: 3,
		color: 'white'
	}
}));

/**
 * Main Component
 */
function Profile(props) {
	const classes = useStyles(props);

	const history = useHistory();
	const routeParams = useParams();
	const currentUser = useSelector(({ auth }) => auth.user);

	const [userdata, setUserdata] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (routeParams.id === currentUser.data._id) {
			setUserdata(currentUser.data);
		}
	}, [routeParams, currentUser]);

	useEffect(() => {
		userdata ? setLoading(false) : setLoading(true);
		console.log(userdata);
	}, [userdata]);

	const goToSettings = (_id = null) => {
		history.push(`/settings/${routeParams.id}`);
	};

	if (loading) {
		return <FuseLoading />;
	}
	return (
		<div className={clsx(classes.root)}>
			<div className={classes.topBg} />
			<div className={clsx(classes.contentCardWrapper, 'container')}>
				<Paper className="h-auto" fullwidth="true">
					<Box className="h-auto">
						<img
							src={
								userdata.profileHeader
									? configPaths.filepath + userdata.profileHeader
									: '/assets/images/notes/beach.jpeg'
							}
							alt=""
							className={classes.profileHeader}
						/>
						<img src={userdata.photoURL} alt="" className={classes.profilePicture} />
						<IconButton
							className={classes.settingsButton}
							aria-label="go to settings"
							onClick={() => goToSettings()}
						>
							<Icon fontSize="large">settings</Icon>
						</IconButton>
					</Box>
					<Box className="p-40">
						<Typography className="text-center" variant="h3">
							{userdata.username}
						</Typography>
						<Box className="w-1/2 mt-40">
							<Box className="flex">
								<Box className="w-1/2">
									<Typography variant="subtitle1" className="font-bold uppercase my-10">
										Position
									</Typography>
									<Typography variant="subtitle1" className="font-bold uppercase my-10">
										Phone Number
									</Typography>
									<Typography variant="subtitle1" className="font-bold uppercase my-10">
										Mobile Number
									</Typography>
									<Typography variant="subtitle1" className="font-bold uppercase my-10">
										Email Address
									</Typography>
									<Typography variant="subtitle1" className="font-bold uppercase my-10">
										Birthday
									</Typography>
								</Box>
								<Box className="w-1/2">
									<Typography variant="subtitle1" className="my-10">
										{userdata.position ? userdata.position : 'Unknown'}
									</Typography>
									<Typography variant="subtitle1" className="my-10">
										{userdata.phone ? userdata.phone : 'Unknown'}
									</Typography>
									<Typography variant="subtitle1" className="my-10">
										{userdata.mobile ? userdata.mobile : 'Unknown'}
									</Typography>
									<Typography variant="subtitle1" className="my-10">
										{userdata.email ? userdata.email : 'Unknown'}
									</Typography>
									<Typography variant="subtitle1" className="my-10">
										{userdata.birthday ? userdata.birthday : 'Unknown'}
									</Typography>
								</Box>
							</Box>
						</Box>
						<Box className="w-1/2" />
					</Box>
				</Paper>
			</div>
		</div>
	);
}

export default Profile;
