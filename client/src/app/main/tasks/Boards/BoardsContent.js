/**
 * The content component of the boards page
 * Created at 2021/09/15
 * Created by Ilia L
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Icon, Paper, Typography } from '@material-ui/core';
import { capitalCase } from 'capital-case';
import withReducer from 'app/store/withReducer';
import FuseLoading from '@fuse/core/FuseLoading';

import reducer from '../store';
import { getBoardsByUserId, createBoard, selectBoards } from '../store/boardsSlice';

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

function BoardsContent(props) {
	/*= ========== Style =========== */
	const classes = useStyles(props);
	const container = {
		show: {
			transition: {
				staggerChildren: 0.1
			}
		}
	};
	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 }
	};
	/*= ============================= */

	const dispatch = useDispatch();
	const history = useHistory();
	const user = useSelector(({ auth }) => auth.user);
	const storeBoards = useSelector(selectBoards);

	/*= ========== Loading ========== */
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		dispatch(getBoardsByUserId(user.data._id)).then(() => setLoading(false));
	}, [dispatch]);
	if (loading) {
		return <FuseLoading />;
	}
	/*= ============================= */

	const handleCreateBoard = () => {
		dispatch(
			createBoard({
				title: 'Untitled Board',
				user: user.data._id
			})
		).then(({ payload }) => {
			history.push(`/tasks/boards/${payload._id}`);
		});
	};

	return (
		<div className={clsx(classes.root, 'flex flex-grow flex-shrink-0 flex-col items-center')}>
			<div className="flex flex-grow flex-shrink-0 flex-col items-center container px-16 md:px-24">
				<motion.div
					variants={container}
					initial="hidden"
					animate="show"
					className="flex flex-wrap w-full justify-center py-32 px-16"
				>
					{/* Created boards */}
					{storeBoards.length > 0 ? (
						storeBoards.map((sBoard, key) => (
							<motion.div variants={item} className="w-224 h-224 p-16" key={key}>
								<Paper
									to={`/tasks/boards/${sBoard._id}`}
									className={clsx(
										classes.board,
										'flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg'
									)}
									role="button"
									component={Link}
								>
									<Icon className="text-56" color="action">
										assessment
									</Icon>
									<Typography className="text-16 font-medium text-center pt-16 px-32" color="inherit">
										{capitalCase(sBoard.title)}
									</Typography>
								</Paper>
							</motion.div>
						))
					) : (
						<></>
					)}

					{/* Create a new board */}
					<motion.div variants={item} className="w-224 h-224 p-16">
						<Paper
							className={clsx(
								classes.board,
								classes.newBoard,
								'flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg outline-none'
							)}
							onClick={handleCreateBoard}
							onKeyDown={handleCreateBoard}
							role="button"
							tabIndex={0}
						>
							<Icon className="text-56" color="secondary">
								add_circle
							</Icon>
							<Typography className="text-16 font-medium text-center pt-16 px-32" color="inherit">
								Add new board
							</Typography>
						</Paper>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
}

export default withReducer('tasks', reducer)(BoardsContent);
