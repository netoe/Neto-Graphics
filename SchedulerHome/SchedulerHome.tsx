'use strict';

import React from 'react';
import Button from '@material-ui/core/Button';
// FIXME About the imports of interfaces; always keep the definitions of types separated.
import {IScheduleReceipt} from '../../core/scheduler/typed/receipts';
import {mDemoSchedules} from '../../core/schedulerx/demo-schedules';
import {AppSecondaryMenu} from '../components/AppSecondaryMenu';
// FIXME For neto web applications.
import {LayoutEmbeddedApp} from '../components/LayoutEmbeddedApp';
import {doReportTheLostOfNetoBridge, getNetoDemoAndDevelopment, getNetoScheduleReceiptsManager} from '../helpers/bridge-neto-core';
import {PageSchedules} from './PageSchedules';
import {R, RR} from './resources';
import {useStyles} from './styles';

const ScheduleReceiptsManager = getNetoScheduleReceiptsManager();

let title = R.title;

interface IProps {}

export const SchedulerHome = React.memo<IProps>(() => {
	const cls = useStyles();
	const [NetoDemoAndDevelopment] = React.useState(getNetoDemoAndDevelopment);
	const [schedules] = React.useState(mDemoSchedules);
	const [sections] = React.useState(RR.getSections(schedules));
	const [menuItemIdSelected, setSelectedMenuItemId] = React.useState(RR.secSchedules.id);
	const [receipts, setReceipts] = React.useState(undefined as IScheduleReceipt[] | undefined);
	React.useEffect(() => {
		if (!ScheduleReceiptsManager) {return doReportTheLostOfNetoBridge({alert: false});}
		ScheduleReceiptsManager.getScheduleReceipts('all').then(receipts => {
			setReceipts(receipts);
		}).catch(ex => {
			console.error('failed to get the receipts:', ex);
		});
	}, []);

	console.log('found receipts:', receipts);

	const onTestButtonClicked = () => {
		if (!NetoDemoAndDevelopment) {return doReportTheLostOfNetoBridge({alert: true});}
		NetoDemoAndDevelopment.showReviewAndPlanDialog().then((res) => {
			console.log('Finished with', res);
		}).catch(ex => console.error('Failed with', ex));
	};

	const onPageSelected = (menuItemIdSelected: string) => {
		setSelectedMenuItemId(menuItemIdSelected);
		switch (menuItemIdSelected) {
			case RR.secSchedules.id:

				break;
			case RR.secActions.id:

				break;
		}
	};

	const renderPageNav = () => (
		<AppSecondaryMenu
			sections={sections} color={'#099'}
			onSelect={onPageSelected} selectedMenuItemId={menuItemIdSelected}
		/>
	);

	const renderPageBody = () => (
		<div className={cls.page} style={{padding: 18}}>
			{menuItemIdSelected === 'schedules' || menuItemIdSelected === 'actions' ? (
				<PageSchedules schedules={schedules} selectedTab={menuItemIdSelected} onTabSelected={onPageSelected}/>
			) : undefined}
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
			nav={renderPageNav()}
		/>
	);
});
