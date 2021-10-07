/**
 * Docs page
 * Created at 2021/09/13
 * Created by	Ilia L
 */
import React from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import PageHeader from 'app/shared-components/PageHeader';

import DocsContent from './DocsContent';

function Docs() {
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
					title="Docs"
					icon="content_copy"
					breadCrumb={{ pageName: 'Dashboard', linkTo: '/dashboard' }}
				/>
			}
			content={<DocsContent />}
			innerScroll
		/>
	);
}

export default Docs;
