import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const rows = [
	{
		id: 'productCode',
		align: 'left',
		disablePadding: false,
		label: 'Product Code',
		sort: true
	},
	{
		id: 'productName',
		align: 'left',
		disablePadding: false,
		label: 'Product Name',
		sort: true
	},
	{
		id: 'soh',
		align: 'left',
		disablePadding: false,
		label: 'SOH',
		sort: true
	},
	{
		id: 'msl',
		align: 'left',
		disablePadding: false,
		label: 'MSL',
		sort: true
	},
	{
		id: 'supplier',
		align: 'left',
		disablePadding: false,
		label: 'Supplier',
		sort: true
	},
	{
		id: 'purchasePrice',
		align: 'left',
		disablePadding: false,
		label: 'Purchase Price',
		sort: true
	},
	{
		id: 'salePrice',
		align: 'left',
		disablePadding: false,
		label: 'Sale Price',
		sort: true
	},
	{
		id: 'category',
		align: 'left',
		disablePadding: false,
		label: 'Category',
		sort: true
	}
];

const useStyles = makeStyles(theme => ({
	actionsButtonWrapper: {
		background: theme.palette.background.paper
	}
}));

function OrdersTableHead(props) {
	const classes = useStyles(props);
	const { selectedOrderIds } = props;
	const numSelected = selectedOrderIds.length;

	const [selectedOrdersMenu, setSelectedOrdersMenu] = useState(null);

	const dispatch = useDispatch();

	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};

	function openSelectedOrdersMenu(event) {
		setSelectedOrdersMenu(event.currentTarget);
	}

	function closeSelectedOrdersMenu() {
		setSelectedOrdersMenu(null);
	}

	// const {onSelectAllClick, order, orderBy, numSelected, rowCount} = props;

	return (
		<TableHead>
			<TableRow className="h-48 sm:h-64">
				{rows.map((row, i) => {
					return (
						<TableCell
							className="p-4 md:p-16"
							key={i}
							align={row.align}
							padding={row.disablePadding ? 'none' : 'default'}
						>
							{row.sort && (
								<Tooltip
									title="Sort"
									placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
									enterDelay={300}
								>
									<TableSortLabel className="font-semibold">{row.label}</TableSortLabel>
								</Tooltip>
							)}
						</TableCell>
					);
				}, this)}
			</TableRow>
		</TableHead>
	);
}

export default OrdersTableHead;
