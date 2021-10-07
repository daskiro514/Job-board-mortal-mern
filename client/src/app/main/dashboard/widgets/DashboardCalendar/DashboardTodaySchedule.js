import {
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	withStyles
} from '@material-ui/core';
import { motion } from 'framer-motion';

const rows = [
	createData('8:00', ''),
	createData('8:30', 'Team meeting'),
	createData('9:00', ''),
	createData('9:30', 'Nigel Call'),
	createData('10:00', ''),
	createData('10:30', ''),
	createData('11:00', ''),
	createData('11:30', ''),
	createData('12:30', 'Lunch With Ray')
];

function createData(time, content) {
	return { time, content };
}

function DashboardTodaySchedule() {
	return (
		<motion.div
			className="w-1/2"
			initial={{ y: 20, opacity: 0 }}
			animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
		>
			<TableContainer component={Paper}>
				<Table aria-label="customized table">
					<TableBody>
						{rows.map((row, i) => (
							<TableRow key={i}>
								<TableCell component="th" scope="row">
									{row.time}
								</TableCell>
								<TableCell>{row.content}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</motion.div>
	);
}

export default DashboardTodaySchedule;
