//

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Schedule} from '../../core/scheduler/schedule';
import {IAction} from '../../core/scheduler/typed/actions';
import {ViewLabelsAndValues} from '../mui-lib/views/ViewLabelsAndValues';
import {getViewSelectableTable, newTableColumn} from '../mui-lib/widgets/TableSelectableRows';
import {useStyles} from './PageSchedule.styles';

interface IProps {
	schedule: Schedule;
}

const TableScheduleActions = getViewSelectableTable<IAction<object>>();

export const PageSchedule = React.memo<IProps>(({schedule}) => {
	const cls = useStyles();

	const [selectedAction, setSelectedAction] = React.useState(undefined as IAction | undefined);

	const onRowSelected = (actionId: any, action: IAction) => {
		console.log('selected:', actionId, action);
		setSelectedAction(action);
	};

	const renderPageBody = () => (
		<Paper className={cls.ctnPaper}>

			<Typography gutterBottom variant="h3" component='h1' className={cls.ctnPageTitle}>{schedule.name}</Typography>

			<div className={cls.ctnContent}>
				{renderScheduleDetails()}
				{renderLatestScheduleReceipt()}
			</div>

			<div>
				{renderScheduleActions()}
			</div>

		</Paper>
	);

	const renderScheduleDetails = () => (
		<ViewLabelsAndValues mode='table' dataset={[
			['状态', schedule.enabled ? '开启' : '关闭'],
			['有效时间段', schedule.range ? '有限制' : '无限制'],
			['触发规则', schedule.timer['rule'] || '未知'],
			['绑定的功能', schedule.actions.length],
		]} className={cls.ctnContentDetails}/>
	);

	const renderLatestScheduleReceipt = () => (
		<div className={cls.ctnContentSection}/>
	);

	// TableScheduleActions.tsx
	const renderScheduleActions = () => (
		<TableScheduleActions
			keyEntryId={'_id'}
			onSelectEntry={onRowSelected}
			selectedEntryId={selectedAction?._id}
			placeholder={'Fine'}
			entries={schedule.actions}
			columns={[
				// newTableColumn('_id', 'ID', 'center'),
				newTableColumn('name', 'Name', 'center'),
				newTableColumn('key', 'Key', 'center'),
				newTableColumn('name', 'Description', 'left'),
			]}
		/>
	);

	return renderPageBody();
});
