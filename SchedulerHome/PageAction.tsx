//

import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {IAction} from 'src/core/scheduler/typed/actions';
import {ViewLabelsAndValues} from 'src/mui-lib/views/ViewLabelsAndValues';
import {useStyles} from './PageSchedule.styles';

interface IProps {
	action: IAction;
}

export const PageAction = React.memo<IProps>(({action}) => {
	const cls = useStyles();

	const doExecuteCurrentAction = () => {
		action.doExecute(+new Date(), action).then(res => {
			console.log('Executed the current action:', res);
		}).catch(ex => {
			console.error('Failed to execute the current action:', ex);
		});
	};

	const renderPageBody = () => (
		<Paper className={cls.ctnPaper}>

			<Typography gutterBottom variant="h3" component='h1' className={cls.ctnPageTitle}>{action.name}</Typography>

			<div className={cls.ctnContent}>
				{renderScheduleDetails()}
				{renderLatestScheduleReceipt()}
			</div>

			<div>
				<h2>Action Demo</h2>
				{renderActionDemo()}
			</div>
		</Paper>
	);

	const renderScheduleDetails = () => (
		<ViewLabelsAndValues mode='table' dataset={[
			['ID', action._id],
			['名字', action.name],
			['描述', action.name],
		]} className={cls.ctnContentDetails}/>
	);

	const renderLatestScheduleReceipt = () => (
		<div className={cls.ctnContentSection}/>
	);

	const renderActionDemo = () => (
		<div>
			<Button variant='contained' color='primary' onClick={doExecuteCurrentAction}>
				{action.name}
			</Button>
		</div>
	);

	return renderPageBody();
});
