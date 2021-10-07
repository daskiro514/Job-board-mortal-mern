import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import reducer from '../store';
import TasksTableHeader from './TasksTableHeader';
import TasksTableContent from './TasksTableContent';

function Orders() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<TasksTableHeader />}
			content={<TasksTableContent />}
			innerScroll
		/>
	);
}

export default withReducer('eCommerceApp', reducer)(Orders);
