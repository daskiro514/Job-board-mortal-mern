/**
 * The column component of the board page
 * Created at 2021/08/20
 * Created by Ilia L
 */

import React, { useRef } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import RootRef from '@material-ui/core/RootRef';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import clsx from 'clsx';

import { Draggable, Droppable } from 'react-beautiful-dnd';
// import BoardAddCard from './BoardAddCard';
import BoardColumnHeader from './BoardColumnHeader';
import JobCard from './JobCard';

const useStyles = makeStyles(theme => ({
	list: {
		backgroundColor: darken(theme.palette.background.paper, theme.palette.type === 'light' ? 0.02 : 0.25),
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	}
}));

function BoardColumn(props) {
	const classes = useStyles(props);
	const contentScrollEl = useRef(null);
	const { index, nameEditable, boardColumn, columnType, jobs } = props;

	function handleCardAdded() {
		contentScrollEl.current.scrollTop = contentScrollEl.current.scrollHeight;
	}
	return (
		<Draggable draggableId={`${columnType}/${boardColumn._id}`} index={index} type="column">
			{(provided, snapshot) => (
				<div ref={provided.innerRef} {...provided.draggableProps}>
					<Card
						className={clsx(
							classes.list,
							snapshot.isDragging ? 'shadow-lg' : 'shadow',
							'w-256 sm:w-320 mx-8 sm:mx-12 max-h-full flex flex-col rounded-20'
						)}
						square
					>
						<BoardColumnHeader
							columnType={columnType}
							boardColumn={boardColumn}
							nameEditable={nameEditable}
							className="border-b-1"
							handleProps={provided.dragHandleProps}
						/>

						<RootRef rootRef={contentScrollEl}>
							<CardContent className="flex flex-col flex-1 flex-auto h-full min-h-0 w-full p-0 overflow-auto">
								<Droppable
									droppableId={`${columnType}/${boardColumn._id}`}
									type="job"
									direction="vertical"
								>
									{_provided => (
										<div ref={_provided.innerRef} className="flex flex-col w-full h-full p-16">
											{jobs.length > 0 ? (
												jobs.map((item, key) => (
													<JobCard
														key={key}
														index={key}
														job={item}
														boardColumn={boardColumn}
														columnType={columnType}
													/>
												))
											) : (
												<></>
											)}
											{_provided.placeholder}
										</div>
									)}
								</Droppable>
							</CardContent>
						</RootRef>
						{/* 
						<CardActions className="p-0 flex-shrink-0">
							<BoardAddCard listId={props.boardField._id} onCardAdded={handleCardAdded} />
						</CardActions> */}
					</Card>
				</div>
			)}
		</Draggable>
	);
}

export default BoardColumn;
