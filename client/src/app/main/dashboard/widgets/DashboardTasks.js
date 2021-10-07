import { fade } from '@material-ui/core/styles/colorManipulator';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
	Box,
	Icon,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@material-ui/core';
import { motion } from 'framer-motion';

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

const StyledTableCell = withStyles(theme => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white
	},
	body: {
		fontSize: 14
	}
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover
		}
	}
}))(TableRow);

function createData(description, customer, due, status) {
	return { description, customer, due, status };
}

const rows = [
	createData('KFO, left leg above knee', 'Richard Hotdog', '12/08/2021', 'In Progress'),
	createData('KFO, left leg above knee', 'Richard Hotdog', '12/08/2021', 'In Progress'),
	createData('KFO, left leg above knee', 'Richard Hotdog', '12/08/2021', 'In Progress'),
	createData('KFO, left leg above knee', 'Richard Hotdog', '12/08/2021', 'In Progress'),
	createData('KFO, left leg above knee', 'Richard Hotdog', '12/08/2021', 'In Progress'),
	createData('KFO, left leg above knee', 'Richard Hotdog', '12/08/2021', 'In Progress')
];

function DashboardTasks(props) {
	const classes = useStyles(props);
	return (
		<Box>
			{/* <div className={classes.topBg} /> */}
			<div className={clsx(classes.contentCardWrapper, 'container')}>
				<div className="flex items-center">
					<Icon
						component={motion.span}
						initial={{ scale: 0 }}
						animate={{ scale: 1, transition: { delay: 0.2 } }}
						className="text-24 md:text-32"
					>
						assignment
					</Icon>
					<Typography
						component={motion.span}
						initial={{ x: -20 }}
						animate={{ x: 0, transition: { delay: 0.2 } }}
						delay={300}
						className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
					>
						Your Tasks
					</Typography>
				</div>

				<TableContainer component={Paper} className="w-full mt-24">
					<Table className={classes.table} aria-label="customized table">
						<TableHead>
							<TableRow>
								<StyledTableCell>Description</StyledTableCell>
								<StyledTableCell>Customer</StyledTableCell>
								<StyledTableCell>Due</StyledTableCell>
								<StyledTableCell>status</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row, i) => (
								<StyledTableRow key={i}>
									<StyledTableCell component="th" scope="row">
										{row.description}
									</StyledTableCell>
									<StyledTableCell>{row.customer}</StyledTableCell>
									<StyledTableCell>{row.due}</StyledTableCell>
									<StyledTableCell>{row.status}</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</Box>
	);
}

export default DashboardTasks;
