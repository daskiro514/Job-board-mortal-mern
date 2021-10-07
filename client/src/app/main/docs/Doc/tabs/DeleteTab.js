/**
 * Delete tab of the doc page
 * Created at 2021/09/14
 * Created by Ilia L
 */
import React from 'react';
import { Icon, Typography, Button, Box } from '@material-ui/core';

function DeleteTab() {
	return (
		<>
			<Typography variant="subtitle1">Really delete?</Typography>
			<Box className="flex">
				<Box className="flex-grow" />
				<Button variant="contained" color="secondary" startIcon={<Icon>delete</Icon>}>
					Delete
				</Button>
			</Box>
		</>
	);
}

export default DeleteTab;
