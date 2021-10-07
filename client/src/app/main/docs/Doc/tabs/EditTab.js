/**
 * Edit tab of the doc page
 * Created at 2021/09/14
 * Created by Ilia L
 */

import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { MenuItem, TextField, Box, Button } from '@material-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';

import WYSIWYGEditor from 'app/shared-components/WYSIWYGEditor';

const CATEGORY_OPTIONS = [
	'Assets and company resources',
	'Customer service',
	'Environment & Sustainability',
	'Featured Articles'
];

const schema = yup.object().shape({
	title: yup.string().required('You must enter a title'),
	category: yup.string().required('You must select a category')
});
function EditTab() {
	const { watch, handleSubmit, formState, control } = useForm({
		mode: 'onChange',
		defaultValues: {
			title: '',
			category: '',
			content: ''
		},
		resolver: yupResolver(schema)
	});
	const { isValid, dirtyFields, errors } = formState;
	const onSubmit = data => {
		console.log(data);
	};
	return (
		<form noValidate onSubmit={handleSubmit(onSubmit)}>
			<Controller
				name="title"
				control={control}
				render={({ field }) => <TextField {...field} label="Title" id="title" variant="outlined" fullWidth />}
			/>
			<Controller
				name="category"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						select
						label="Category"
						id="category"
						variant="outlined"
						fullWidth
						className="mt-20"
					>
						{CATEGORY_OPTIONS.map((item, i) => (
							<MenuItem key={i} value={i}>
								{item}
							</MenuItem>
						))}
					</TextField>
				)}
			/>
			<Controller
				name="content"
				control={control}
				render={({ field }) => <WYSIWYGEditor {...field} name="content" className="mt-20" />}
			/>
			<Box className="flex justify-center mt-32">
				<Button variant="contained" color="secondary" disabled={_.isEmpty(dirtyFields) || !isValid}>
					Submit
				</Button>
			</Box>
		</form>
	);
}

export default EditTab;
