import FuseScrollbars from '@fuse/core/FuseScrollbars';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import { memo } from 'react';
import { Box } from '@material-ui/core';
import { toggleQuickPanel } from './store/stateSlice';
import reducer from './store';

const useStyles = makeStyles(theme => ({
	root: {
		width: 280
	}
}));

function QuickPanel(props) {
	const dispatch = useDispatch();
	const state = useSelector(({ quickPanel }) => quickPanel.state);

	const classes = useStyles();

	return (
		<SwipeableDrawer
			classes={{ paper: classes.root }}
			open={state}
			anchor="right"
			onOpen={ev => {}}
			onClose={ev => dispatch(toggleQuickPanel())}
			disableSwipeToOpen
		>
			<FuseScrollbars>
				<Box className="my-24">
					<Typography variant="h5" className="uppercase text-center">
						My Apps
					</Typography>
					<Box className="flex mt-24">
						<Box className="w-1/4 mx-6 text-center">
							<img src="/assets/images/nookal.png" alt="nookal" />
							<Typography variant="subtitle1">Nookal</Typography>
						</Box>
						<Box className="w-1/4 mx-6 text-center">
							<img src="/assets/images/xero.png" alt="xero" />
							<Typography variant="subtitle1">Xero</Typography>
						</Box>
						<Box className="w-1/4 mx-6 text-center">
							<img src="/assets/images/mail.png" alt="mail" />
							<Typography variant="subtitle1">Mail</Typography>
						</Box>
						<Box className="w-1/4 mx-6 text-center">
							<img src="/assets/images/mht.png" alt="mht" />
							<Typography variant="subtitle1">MHT</Typography>
						</Box>
					</Box>
				</Box>
				<Box className="my-24">
					<Typography variant="h5" className="uppercase text-center">
						Recent Places
					</Typography>
					<Box className="mt-12 px-12">
						<Typography variant="body1">Laptop Computer Policy</Typography>
						<Typography variant="body1">How to use the Boardroom AV equipment</Typography>
						<Typography variant="body1">Job #174897</Typography>
						<Typography variant="body1">Job #174883</Typography>
						<Typography variant="body1">Packaging Rates</Typography>
						<Typography variant="body1">Job #174884</Typography>
						<Typography variant="body1">Inventory</Typography>
					</Box>
				</Box>
				<Box className="my-24">
					<Typography variant="h5" className="uppercase text-center">
						Birthdays
					</Typography>
					<Box className="flex mt-12 px-12">
						<Box className="w-1/4 mx-6">
							<img src="/assets/images/Stevie.png" alt="" />
						</Box>
						<Box className="w-3/4">
							<Typography variant="subtitle1" className="pt-10">
								<b>Stevie Boy</b> on August 24
							</Typography>
						</Box>
					</Box>
					<Box className="flex mt-12 px-12">
						<Box className="w-1/4 mx-6">
							<img src="/assets/images/Mike.png" alt="" />
						</Box>
						<Box className="w-3/4">
							<Typography variant="subtitle1" className="pt-10">
								<b>Mike Guy</b> on August 27
							</Typography>
						</Box>
					</Box>
					<Box className="flex mt-12 px-12">
						<Box className="w-1/4 mx-6">
							<img src="/assets/images/Josie.png" alt="" />
						</Box>
						<Box className="w-3/4">
							<Typography variant="subtitle1" className="pt-10">
								<b>Josie Walker</b> on August 30
							</Typography>
						</Box>
					</Box>
				</Box>
			</FuseScrollbars>
		</SwipeableDrawer>
	);
}

export default withReducer('quickPanel', reducer)(memo(QuickPanel));
