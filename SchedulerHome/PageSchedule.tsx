//

import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Schedule} from '../../core/scheduler/schedule';
import {ViewLabelsAndValues} from '../mui-lib/views/ViewLabelsAndValues';
import {useStyles} from './PageSchedule.styles';

interface IProps {
	schedule: Schedule;
}

export const PageSchedule = React.memo<IProps>(({schedule}) => {
	const cls = useStyles();

	const renderPageBody = () => (
		<Paper className={cls.ctnPaper}>

			<Typography gutterBottom variant="h3" component='h1' className={cls.ctnPageTitle}>{schedule.name}</Typography>

			<div className={cls.ctnContent}>
				{renderScheduleDetails()}
				{renderLatestScheduleReceipt()}
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

	return renderPageBody();
});
