import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Typography, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { red, blue, green } from '@material-ui/core/colors';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';

const StyledPaper = withStyles({
	root: {
		background: 'url(../../assets/images/demo-content/morain-lake.jpg) no-repeat',
		backgroundSize: 'cover',
		height: `${50}rem`
	}
})(Paper);

const CarouselSummaryContainerBox = withStyles({
	root: {
		position: 'relative',
		width: `${90}%`,
		height: `${40}%`,
		margin: '0 auto',
		bottom: 1,
		top: `${55}%`,
		padding: '2rem'
	}
})(Box);

const CarouselSummaryMaskBox = withStyles({
	root: {
		background: 'black',
		opacity: 0.5,
		width: `${100}%`,
		height: `${100}%`,
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: 1,
		margin: '0 auto'
	}
})(Box);

const CarouselSummaryContentBox = withStyles({
	root: {
		position: 'relative',
		zIndex: 2,
		color: 'white',
		textAlign: 'right',
		marginTop: '3rem'
	}
})(Box);

function DashboardCarousel(props) {
	const items = [
		{
			name: 'Random Name #1',
			description: 'Probably the most random thing you have ever seen!'
		},
		{
			name: 'Random Name #2',
			description: 'Hello World!'
		}
	];

	return (
		<Box>
			<Carousel>
				{items.map((item, i) => (
					<Item key={i} item={item} />
				))}
			</Carousel>
		</Box>
	);
}

function Item(props) {
	return (
		<StyledPaper>
			<CarouselSummaryContainerBox>
				<CarouselSummaryMaskBox />
				<CarouselSummaryContentBox>
					<Typography variant="h3">New Leave Procedure</Typography>
					<Typography variant="h6">New leave procedure to book leave and view leave balances.</Typography>
					<Typography variant="h6">All staff need to use this procedure from next week.</Typography>
				</CarouselSummaryContentBox>
			</CarouselSummaryContainerBox>
		</StyledPaper>
	);
}

export default DashboardCarousel;
