//

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Schedule} from '../../core/scheduler/schedule';
import {IAction} from '../../core/scheduler/typed/actions';
import {IScheduleReceipt} from '../../core/scheduler/typed/receipts';
import {getNetoScheduleReceiptsManager} from '../helpers/bridge-neto-core';
import {ViewLabelsAndValues} from '../mui-lib/views/ViewLabelsAndValues';
import {getViewSelectableTable, newTableColumn} from '../mui-lib/widgets/TableSelectableRows';
import {useStyles} from './PageSchedule.styles';

interface IProps {
	schedule: Schedule;
}

const TableScheduleActions = getViewSelectableTable<IAction<object>>();
const TableScheduleReceipts = getViewSelectableTable<IScheduleReceipt>();
const manager = getNetoScheduleReceiptsManager();

export const PageSchedule = React.memo<IProps>(({schedule}) => {
	const cls = useStyles();

	const [receipts, setReceipts] = React.useState(undefined as IScheduleReceipt[] | undefined);
	const [selectedAction, setSelectedAction] = React.useState(undefined as IAction | undefined);
	const [selectedReceipt, setSelectedReceipt] = React.useState(undefined as IScheduleReceipt | undefined);

	React.useEffect(() => {
		setReceipts(undefined);
		manager?.getScheduleReceipts(schedule.name).then(receipts => {
			console.log('Get the receipts:', receipts);
			setReceipts(receipts);
		}).catch(ex => {
			console.error('failed to get the receipts:', ex);
		});
	}, [schedule]);

	const onRowSelected = (actionId: any, action: IAction) => {
		console.log('selected:', actionId, action);
		setSelectedAction(action);
	};

	const onReceiptSelected = (receiptId: any, receipt: IScheduleReceipt) => {
		console.log('selected:', receiptId, receipt);
		setSelectedReceipt(receipt);
	};

	const renderPageBody = () => (
		<Paper className={cls.ctnPaper}>

			<Typography gutterBottom variant="h3" component='h1' className={cls.ctnPageTitle}>{schedule.name}</Typography>

			<div className={cls.ctnContent}>
				{renderScheduleDetails()}
				{renderLatestScheduleReceipt()}
			</div>

			<div>
				<h2>Schedule Actions</h2>
				{renderScheduleActions()}
			</div>

			<div>
				<h2>Schedule Receipts</h2>
				{renderScheduleReceipts()}
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
			keyEntryId={'_id'} align='center'
			selectedEntryId={selectedAction?._id} onSelectEntry={onRowSelected}
			entries={schedule.actions} placeholder={'Fine'}
			columns={[
				// newTableColumn('_id', 'ID', 'center'),
				newTableColumn('name', 'Name'),
				newTableColumn('key', 'Key'),
				newTableColumn('name', 'Description', {align: 'left'}),
			]}
		/>
	);

	// TableScheduleReceipts.tsx
	const renderScheduleReceipts = () => (
		<TableScheduleReceipts
			keyEntryId={'_id'} align='center'
			selectedEntryId={selectedReceipt?._id} onSelectEntry={onReceiptSelected}
			entries={receipts} placeholder={'Fine'}
			columns={[
				// newTableColumn('_id', 'ID', 'center'),
				newTableColumn('_id', 'ID'),
				newTableColumn('taskId', 'Task'),
				newTableColumn('code', 'Code'),
				newTableColumn('duration', 'Duration', undefined, (entry, value) => (value / 1000).toFixed(2) + 's'),
				newTableColumn('time', 'Time', undefined, (entry, value, index) => new Date(value).toLocaleString()),
			]}
		/>
	);

	return renderPageBody();
});
