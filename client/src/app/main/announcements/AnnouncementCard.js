import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import parse from 'html-react-parser';
import configPaths from 'utils/configPaths';
import strings from 'utils/strings';

const useStyles = makeStyles({
	root: {
		width: '100%',
		marginBottom: '6rem'
	},
	imageSize: {
		height: '40rem'
	}
});

function AnnouncementCard(props) {
	const classes = useStyles();
	const { announcement } = props;
	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
					component="img"
					alt={announcement.headline}
					image={
						announcement.featuredImage
							? configPaths.filepath + announcement.featuredImage
							: strings.DEFAULT_IMAGE_URL
					}
					title="Contemplative Reptile"
					className={classes.imageSize}
				/>
				<CardContent>
					<Typography variant="subtitle1">
						<b>{announcement.createdAt.split('T')[0]}</b> by {announcement.creator.username}
					</Typography>
					<Divider className="my-10" variant="middle" />
					<Typography gutterBottom variant="h4" component="h2">
						{announcement.headline}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{/* <Markup content={announcement.content} />  */}
						{parse(announcement.content)}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default AnnouncementCard;
