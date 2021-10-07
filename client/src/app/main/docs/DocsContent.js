/**
 * The content of the Docs page
 * Created at 2021/09/13
 * Created by Ilia L
 */

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Grid, IconButton, Icon, Typography, Box, Button } from '@material-ui/core';

const ASSETS_AND_COMPANY = ['Company property and equipment policy', 'Laptop computer policy'];

const FEATURED_ARTICLES = [
	'Adding email on your phone',
	'Cloud Portal for remote collaboration',
	'Cybersecurity Policy',
	'Easy video conferencing instructions',
	'Electronic communication policy',
	'How to setup Outlook on a PC',
	'How to use remote desktop',
	'Rocketchat access and setup'
];

const FINANCE = ['Confidentiality Aggreement'];

const HUMAN_RESOURCES = ['Leave policy', 'Serious misconduct policy', 'Sexual harassment', 'Workplace builying policy'];

function DocsContent() {
	return (
		<Container maxWidth="xl">
			<Grid container spacing={3} style={{ marginTop: 10 }}>
				<Grid item xs={12} md={6}>
					<Typography variant="h5">
						<IconButton>
							<Icon style={{ fontSize: 30, color: 'black' }}>folder</Icon>
						</IconButton>
						<b>Assets and company resources(2)</b>
					</Typography>
					<Box style={{ marginLeft: 30 }}>
						{ASSETS_AND_COMPANY.map((item, i) => (
							<Box key={i}>
								<Button
									component={RouterLink}
									to={`docs/${i}`}
									startIcon={<Icon color="secondary">description</Icon>}
								>
									{item}
								</Button>
							</Box>
						))}
					</Box>
				</Grid>
				<Grid item xs={12} md={6}>
					<Typography variant="h5">
						<IconButton>
							<Icon style={{ fontSize: 30, color: 'black' }}>folder</Icon>
						</IconButton>
						<b>Featured Articles(8)</b>
					</Typography>
					<Box style={{ marginLeft: 30 }}>
						{FEATURED_ARTICLES.map((item, i) => (
							<Box key={i}>
								<Button
									component={RouterLink}
									to={`docs/${i}`}
									startIcon={<Icon color="secondary">description</Icon>}
								>
									{item}
								</Button>
							</Box>
						))}
					</Box>
				</Grid>
				<Grid item xs={12} md={6}>
					<Typography variant="h5">
						<IconButton>
							<Icon style={{ fontSize: 30, color: 'black' }}>folder</Icon>
						</IconButton>
						<b>Finance(1)</b>
					</Typography>
					<Box style={{ marginLeft: 30 }}>
						{FINANCE.map((item, i) => (
							<Box key={i}>
								<Button
									component={RouterLink}
									to={`docs/${i}`}
									startIcon={<Icon color="secondary">description</Icon>}
								>
									{item}
								</Button>
							</Box>
						))}
					</Box>
				</Grid>
				<Grid item xs={12} md={6}>
					<Typography variant="h5">
						<IconButton>
							<Icon style={{ fontSize: 30, color: 'black' }}>folder</Icon>
						</IconButton>
						<b>Human Resources(4)</b>
					</Typography>
					<Box style={{ marginLeft: 30 }}>
						{HUMAN_RESOURCES.map((item, i) => (
							<Box key={i}>
								<Button
									component={RouterLink}
									to={`docs/${i}`}
									startIcon={<Icon color="secondary">description</Icon>}
								>
									{item}
								</Button>
							</Box>
						))}
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
}

export default DocsContent;
