/**
 * Individual doc page
 * Created at 2021/09/14
 * Created by Ilia L
 */
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { capitalCase } from 'capital-case';
import { Tabs, Tab, Icon, Container } from '@material-ui/core';
import FusePageCarded from '@fuse/core/FusePageCarded';
import PageHeader from 'app/shared-components/PageHeader';

import ViewTab from './tabs/ViewTab';
import EditTab from './tabs/EditTab';
import CommentsTab from './tabs/CommentsTab';
import RevisionsTab from './tabs/RevisionsTab';
import DeleteTab from './tabs/DeleteTab';

function Doc() {
	const { id } = useParams();
	/*= ========== For Tabs ============ */
	const TABS = [
		{
			label: 'view',
			icon: 'visibility'
		},
		{
			label: 'edit',
			icon: 'edit'
		},
		{
			label: 'comments',
			icon: 'comment'
		},
		{
			label: 'revision',
			icon: 'history'
		},
		{
			label: 'delete',
			icon: 'delete'
		}
	];
	const [currentTab, setCurrentTab] = useState(0);

	//	Called when the click a tab.
	const handleTabChange = (event, value) => {
		setCurrentTab(value);
	};
	/*= =============================== */
	return (
		<FusePageCarded
			classes={{
				root: '',
				header: 'h-96 min-h-96 sm:h-160 sm:min-h-160',
				sidebarHeader: 'h-96 min-h-96 sm:h-160 sm:min-h-160',
				rightSidebar: 'w-320'
			}}
			header={
				<PageHeader
					title="Doc name"
					subtitle="Doc detail"
					icon="description"
					breadCrumb={{ pageName: 'Docs', linkTo: '/docs' }}
				/>
			}
			contentToolbar={
				<Tabs
					value={currentTab}
					onChange={handleTabChange}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
					scrollButtons="auto"
					classes={{ root: 'w-full h-64' }}
				>
					{TABS.map((item, i) => (
						<Tab key={i} className="h-64" label={capitalCase(item.label)} icon={<Icon>{item.icon}</Icon>} />
					))}
				</Tabs>
			}
			content={
				<div className="p-16 sm:p-24">
					<Container maxWidth="lg" className="mt-24">
						<div className={currentTab !== 0 ? 'hidden' : ''}>
							<ViewTab />
						</div>
						<div className={currentTab !== 1 ? 'hidden' : ''}>
							<EditTab />
						</div>
						<div className={currentTab !== 2 ? 'hidden' : ''}>
							<CommentsTab />
						</div>
						<div className={currentTab !== 3 ? 'hidden' : ''}>
							<RevisionsTab />
						</div>
						<div className={currentTab !== 4 ? 'hidden' : ''}>
							<DeleteTab />
						</div>
					</Container>
				</div>
			}
			innerScroll
		/>
	);
}

export default Doc;
