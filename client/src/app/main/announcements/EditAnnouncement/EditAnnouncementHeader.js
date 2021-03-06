import { Icon, Typography, useTheme } from '@material-ui/core';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function EditAnnouncementHeader(props) {
	// const methods = useFormContext();
	// const { formState, watch, getValues } = methods;
	// const { isValid, dirtyFields } = formState;
	// const name = watch('name');

	const theme = useTheme();
	const { routeParams } = props;
	const [pageTitle, setPageTitle] = useState('');

	useEffect(() => {
		if (routeParams.op === 'create') {
			setPageTitle('New');
		} else {
			setPageTitle('Update');
		}
	}, [routeParams.op]);

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex flex-col items-start max-w-full min-w-0">
				<motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
					<Typography
						className="flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/announcements"
						color="inherit"
					>
						<Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
						<span className="hidden sm:flex mx-4 font-medium">Announcements</span>
					</Typography>
				</motion.div>

				<div className="flex items-center max-w-full">
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
							<Typography className="text-16 sm:text-20 truncate font-semibold">
								{pageTitle} Announcement
							</Typography>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditAnnouncementHeader;
