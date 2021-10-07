import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from 'app/auth/store/userSlice';
import { Divider } from '@material-ui/core';

function UserMenu(props) {
	const dispatch = useDispatch();
	const user = useSelector(({ auth }) => auth.user);

	const [userMenu, setUserMenu] = useState(null);

	const userMenuClick = event => {
		setUserMenu(event.currentTarget);
	};

	const userMenuClose = () => {
		setUserMenu(null);
	};

	return (
		<>
			<Button className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6" onClick={userMenuClick}>
				<div className="hidden md:flex flex-col mx-4 items-end">
					<Typography component="span" className="font-semibold flex">
						{user.data.displayName}
					</Typography>
					<Typography className="text-11 font-medium capitalize" color="textSecondary">
						{user.role.toString()}
						{(!user.role || (Array.isArray(user.role) && user.role.length === 0)) && 'Guest'}
					</Typography>
				</div>

				{user.data.photoURL ? (
					<Avatar className="md:mx-4" alt="user photo" src={user.data.photoURL} />
				) : (
					<Avatar className="md:mx-4">{user.data.displayName[0]}</Avatar>
				)}
			</Button>

			<Popover
				open={Boolean(userMenu)}
				anchorEl={userMenu}
				onClose={userMenuClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
				classes={{
					paper: 'py-8'
				}}
			>
				{!user.role || user.role.length === 0 ? (
					<>
						<MenuItem component={Link} to="/login" role="button">
							<ListItemIcon className="min-w-40">
								<Icon>lock</Icon>
							</ListItemIcon>
							<ListItemText primary="Login" />
						</MenuItem>
						<MenuItem component={Link} to="/register" role="button">
							<ListItemIcon className="min-w-40">
								<Icon>person_add</Icon>
							</ListItemIcon>
							<ListItemText primary="Register" />
						</MenuItem>
					</>
				) : (
					<>
						<MenuItem component={Link} to="/announcements/create" onClick={userMenuClose} role="button">
							<ListItemIcon className="min-w-40">
								<Icon>announcement</Icon>
							</ListItemIcon>
							<ListItemText primary="New Announcement" />
						</MenuItem>
						<MenuItem component={Link} to="/tasks/create" onClick={userMenuClose} role="button">
							<ListItemIcon className="min-w-40">
								<Icon>assignment</Icon>
							</ListItemIcon>
							<ListItemText primary="New Task" />
						</MenuItem>
						<MenuItem component={Link} to="/inventories/create" onClick={userMenuClose} role="button">
							<ListItemIcon className="min-w-40">
								<Icon>list_alt</Icon>
							</ListItemIcon>
							<ListItemText primary="New Inventory Item" />
						</MenuItem>
						<MenuItem component={Link} to="/docs/create" onClick={userMenuClose} role="button">
							<ListItemIcon className="min-w-40">
								<Icon>description</Icon>
							</ListItemIcon>
							<ListItemText primary="New Documents" />
						</MenuItem>
						<MenuItem component={Link} to="/assets/create" onClick={userMenuClose} role="button">
							<ListItemIcon className="min-w-40">
								<Icon>web_asset</Icon>
							</ListItemIcon>
							<ListItemText primary="New Asset" />
						</MenuItem>
						<MenuItem component={Link} to="/jobs/create" onClick={userMenuClose} role="button">
							<ListItemIcon className="min-w-40">
								<Icon>work_outline</Icon>
							</ListItemIcon>
							<ListItemText primary="New Jobs" />
						</MenuItem>
						<MenuItem component={Link} to="/events/create" onClick={userMenuClose} role="button">
							<ListItemIcon className="min-w-40">
								<Icon>event</Icon>
							</ListItemIcon>
							<ListItemText primary="New Events" />
						</MenuItem>
						<MenuItem component={Link} to="/training/create" onClick={userMenuClose} role="button">
							<ListItemIcon className="min-w-40">
								<Icon>training</Icon>
							</ListItemIcon>
							<ListItemText primary="New Training Item" />
						</MenuItem>
						<Divider />
						<MenuItem
							component={Link}
							to={`/profile/${user.data._id}`}
							onClick={userMenuClose}
							role="button"
						>
							<ListItemIcon className="min-w-40">
								<Icon>account_circle</Icon>
							</ListItemIcon>
							<ListItemText primary="My Profile" />
						</MenuItem>
						<MenuItem component={Link} to="/apps/mail" onClick={userMenuClose} role="button">
							<ListItemIcon className="min-w-40">
								<Icon>mail</Icon>
							</ListItemIcon>
							<ListItemText primary="Inbox" />
						</MenuItem>
						<MenuItem
							onClick={() => {
								dispatch(logoutUser());
								userMenuClose();
							}}
						>
							<ListItemIcon className="min-w-40">
								<Icon>exit_to_app</Icon>
							</ListItemIcon>
							<ListItemText primary="Logout" />
						</MenuItem>
					</>
				)}
			</Popover>
		</>
	);
}

export default UserMenu;
