//

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Schedule} from '../../core/scheduler/schedule';

const useStyles = makeStyles({
	card: {margin: 18, background: '#f9f9f9'},
	ctnContent: {display: 'flex'},
	ctnContentSection: {color: '#666', fontSize: 'medium', minWidth: '40%', background: '#fff', borderRadius: '6px', padding: '8px 39px 8px'},
	ctnKeyValue: {display: 'flex', margin: '8px 0', minWidth: '300px'},
	label: {flex: '1', textAlign: 'right', marginRight: '8px'},
	value: {flex: 1, color: '#888'},
});

interface IProps {
	schedule: Schedule;
}

export const CardSchedule = React.memo<IProps>(({schedule}) => {
	const cls = useStyles();

	const renderLatestScheduleReceipt = () => (
		<div className={cls.ctnContentSection}/>
	);

	const renderCardDetail = () => (
		<div className={cls.ctnContentSection}>
			{[
				['状态', schedule.enabled ? '开启' : '关闭'],
				['有效时间段', schedule.range ? '有限制' : '无限制'],
				['触发规则', schedule.timer['rule'] || '未知'],
				['绑定的功能', schedule.actions.length],
			].map(([key, value]) => (
				<div className={cls.ctnKeyValue}>
					<div className={cls.label}>{key}:</div>
					<div className={cls.value}>{value}</div>
				</div>
			))}
		</div>
	);

	return (
		<Card className={cls.card}>
			<CardActionArea>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">{schedule.name}</Typography>
					<div className={cls.ctnContent}>
						{renderCardDetail()}
					</div>
				</CardContent>
			</CardActionArea>
		</Card>
	);
});
