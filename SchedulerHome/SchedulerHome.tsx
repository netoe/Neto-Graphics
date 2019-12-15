'use strict';

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {doReportTheLostOfNetoBridge, getNetoDemoAndDevelopment} from '../helpers/bridge-neto-core';
import {URM} from '../resources/resources';
import {R} from './resources';
import {useStyles} from './styles';

let title = R.title;

interface IProps {}

interface IState {}

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

	const renderAppBar = () => (
		<AppBar position='static'>
			<Toolbar>
				<div className={cls.headerLogoBox}><img className={cls.headerLogoImg} src={URM.logo}/></div>
				<Typography variant="h6" color="inherit" className={cls.headerTitle}>{title}</Typography>
			</Toolbar>
		</AppBar>
	);

	const renderBody = () => (
		<div className={cls.body}>
			{renderPageBody()}
		</div>
	);

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
		<div className={cls.container}>
			{renderAppBar()}
			{renderBody()}
		</div>
	);
});
