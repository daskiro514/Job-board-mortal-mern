import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import TasksTableHead from './TasksTableHead';

function OrdersTable(props) {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	const handleRequestSort = (event, property) => {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	};

	const handleDeselect = () => {
		setSelected([]);
	};

	function handleCheck(event, id) {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	}

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	if (loading) {
		return <FuseLoading />;
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<TasksTableHead
						selectedOrderIds={selected}
						onRequestSort={handleRequestSort}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						<TableRow className="h-72 cursor-pointer">
							<TableCell className="p-4 md:p-16" component="th" scope="row">
								STR50Red
							</TableCell>
							<TableCell className="p-4 md:p-16" component="th" scope="row">
								50mm Strap Red
							</TableCell>
							<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
								55
							</TableCell>
							<TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
								20
							</TableCell>
							<TableCell className="p-4 md:p-16" component="th" scope="row">
								Myrdal Orthopedic Technologies
							</TableCell>
							<TableCell className="p-4 md:p-16" component="th" scope="row">
								$18.55
							</TableCell>
							<TableCell className="p-4 md:p-16" component="th" scope="row">
								$30.00
							</TableCell>
							<TableCell className="p-4 md:p-16" component="th" scope="row">
								Components, Straps
							</TableCell>
						</TableRow>
						<TableRow className="h-72 cursor-pointer">
							<TableCell className="p-4 md:p-16" component="th" scope="row">
								STR50Red
							</TableCell>
							<TableCell className="p-4 md:p-16" component="th" scope="row">
								50mm Strap Red
							</TableCell>
							<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
								55
							</TableCell>
							<TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
								20
							</TableCell>
							<TableCell className="p-4 md:p-16" component="th" scope="row">
								Myrdal Orthopedic Technologies
							</TableCell>
							<TableCell className="p-4 md:p-16" component="th" scope="row">
								$18.55
							</TableCell>
							<TableCell className="p-4 md:p-16" component="th" scope="row">
								$30.00
							</TableCell>
							<TableCell className="p-4 md:p-16" component="th" scope="row">
								Components, Straps
							</TableCell>
						</TableRow>
						<TableRow className="h-72 cursor-pointer">
							<TableCell className="p-4 md:p-16" component="th" scope="row">
								STR50Red
							</TableCell>
							<TableCell className="p-4 md:p-16" component="th" scope="row">
								50mm Strap Red
							</TableCell>
							<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
								55
							</TableCell>
							<TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
								20
							</TableCell>
							<TableCell className="p-4 md:p-16" component="th" scope="row">
								Myrdal Orthopedic Technologies
							</TableCell>
							<TableCell className="p-4 md:p-16" component="th" scope="row">
								$18.55
							</TableCell>
							<TableCell className="p-4 md:p-16" component="th" scope="row">
								$30.00
							</TableCell>
							<TableCell className="p-4 md:p-16" component="th" scope="row">
								Components, Straps
							</TableCell>
						</TableRow>
						<TableRow className="h-72 cursor-pointer">
							<TableCell className="p-4 md:p-16" component="th" scope="row">
								STR50Red
							</TableCell>
							<TableCell className="p-4 md:p-16" component="th" scope="row">
								50mm Strap Red
							</TableCell>
							<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
								55
							</TableCell>
							<TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
								20
							</TableCell>
							<TableCell className="p-4 md:p-16" component="th" scope="row">
								Myrdal Orthopedic Technologies
							</TableCell>
							<TableCell className="p-4 md:p-16" component="th" scope="row">
								$18.55
							</TableCell>
							<TableCell className="p-4 md:p-16" component="th" scope="row">
								$30.00
							</TableCell>
							<TableCell className="p-4 md:p-16" component="th" scope="row">
								Components, Straps
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</FuseScrollbars>
		</div>
	);
}

export default withRouter(OrdersTable);
