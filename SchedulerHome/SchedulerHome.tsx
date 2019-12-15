'use strict';

import React from 'react';
import Button from '@material-ui/core/Button';
import {LayoutEmbeddedApp} from '../components/LayoutEmbeddedApp';
import {doReportTheLostOfNetoBridge, getNetoDemoAndDevelopment} from '../helpers/bridge-neto-core';
import {R} from './resources';
import {useStyles} from './styles';

let title = R.title;

interface IProps {}

export const SchedulerHome = React.memo<IProps>(() => {
	const cls = useStyles();
	const [NetoDemoAndDevelopment] = React.useState(getNetoDemoAndDevelopment);

	const ScheduleReceiptsManager: any = window['_NetoScheduleReceiptsManager'];
	const receipts: any = ScheduleReceiptsManager ? ScheduleReceiptsManager.receipts : undefined;

	console.log('found receipts:', receipts);

	const onTestButtonClicked = () => {
		if (!NetoDemoAndDevelopment) {return doReportTheLostOfNetoBridge({alert: true});}
		NetoDemoAndDevelopment.showReviewAndPlanDialog().then((res) => {
			console.log('Finished with', res);
		}).catch(ex => console.error('Failed with', ex));
	};

	const renderPageBody = () => (
		<div className={cls.page} style={{padding: 18}}>
			<Button variant='contained' color='primary' onClick={onTestButtonClicked}>Hello</Button>
			{receipts ? receipts.map(((schedule: any) => (
				<div>
					{JSON.stringify(schedule)}
				</div>
			))) : undefined}
		</div>
	);

	return (
		<LayoutEmbeddedApp
			title={title} body={renderPageBody()}
		/>
	);
});
