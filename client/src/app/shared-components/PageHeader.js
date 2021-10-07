/**
 * The header component of each dashboard page
 * Created at 2021/09/15
 * Created by Ilia L
 */
import React from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import { Icon, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

function PageHeader({ breadCrumb, title, subtitle, icon }) {
	const theme = useTheme();
	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex flex-col items-start max-w-full min-w-0">
				<motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
					<Typography
						className="flex items-center sm:mb-12"
						component={Link}
						role="button"
						to={breadCrumb.linkTo}
						color="inherit"
					>
						<Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
						<span className="hidden sm:flex mx-4 font-medium">{breadCrumb.pageName}</span>
					</Typography>
				</motion.div>

				<div className="flex items-center max-w-full">
					<motion.div
						className="hidden sm:flex"
						initial={{ scale: 0 }}
						animate={{ scale: 1, transition: { delay: 0.3 } }}
					>
						<Icon className="text-5xl">{icon}</Icon>
					</motion.div>
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
							<Typography className="text-16 sm:text-20 truncate font-semibold">{title}</Typography>
							<Typography variant="caption" className="font-medium">
								{subtitle}
							</Typography>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PageHeader;
