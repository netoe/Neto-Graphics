'use strict';

import React from 'react';
import Button from '@material-ui/core/Button';
import {IAction} from '../../core/scheduler/typed/actions';
// FIXME About the imports of interfaces; always keep the definitions of types separated.
import {IScheduleReceipt} from '../../core/scheduler/typed/receipts';
import {mDemoActions, mDemoSchedules} from '../../core/schedulerx/demo-schedules';
import {IMenuItem, IMenuSection} from 'src/mui-views/app/AppSecondaryMenu';
// FIXME For neto web applications.
import {LayoutAppHeader} from 'src/mui-views/app/LayoutAppHeader';
import {doReportTheLostOfNetoBridge, getNetoDemoAndDevelopment, getNetoScheduleReceiptsManager} from '../helpers/bridge-neto-core';
import {PageAction} from './PageAction';
import {PageSchedule} from './PageSchedule';
import {PageSchedules} from './PageSchedules';
import {AppSchedulerMenu, R, RR} from './resources';
import {useStyles} from './styles';

const ScheduleReceiptsManager = getNetoScheduleReceiptsManager();

let title = R.title;

interface IProps {}

export const SchedulerHome = React.memo<IProps>(() => {
	const cls = useStyles();
	const [NetoDemoAndDevelopment] = React.useState(getNetoDemoAndDevelopment);
	const [schedules] = React.useState(mDemoSchedules);
	const [actions] = React.useState(mDemoActions as IAction[]);
	const [sections] = React.useState(RR.getSections(schedules, actions));
	const [menuSectionIdSelected, setSelectedMenuSectionId] = React.useState(RR.secOverview._id);
	const [menuItemIdSelected, setSelectedMenuItemId] = React.useState(RR.secSchedules._id);
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

	const onPageSelected = (menuItemIdSelected: string, menuItem: IMenuItem, section: IMenuSection) => {
		setSelectedMenuSectionId(section._id);
		setSelectedMenuItemId(menuItemIdSelected);
	};

	const renderPageNav = () => (
		<AppSchedulerMenu
			sections={sections} color={'#099'}
			onSelect={onPageSelected} selectedMenuItemId={menuItemIdSelected}
		/>
	);

	const renderPageBody = () => (
		<div className={cls.page} style={{padding: 18}}>
			{renderDynamicalPage() || renderFallthroughPage()}
		</div>
	);

	const renderDynamicalPage = () => {
		switch (menuSectionIdSelected) {
			case RR.secOverview._id:
				return renderSelectedOverview();
			case RR.secSchedules._id:
				return renderSelectedSchedule(menuItemIdSelected);
			case RR.secActions._id:
				return renderSelectedAction(menuItemIdSelected);
			default:
				return renderFallthroughPage();
		}
	};

	const renderSelectedOverview = (): React.ReactNode | undefined => {
		return menuItemIdSelected === 'schedules' || menuItemIdSelected === 'actions' ? (
			<PageSchedules schedules={schedules} selectedTab={menuItemIdSelected} onTabSelected={(menuId) => onPageSelected(menuId, RR.secSchedules, RR.secOverview)}/>
		) : undefined;
	};
	const renderSelectedSchedule = (menuItemIdSelected: string) => {
		const schedule = schedules.find(schedule => schedule.name === menuItemIdSelected);
		if (!schedule) {return undefined; }
		return (
			<PageSchedule schedule={schedule}/>
		);
	};
	const renderSelectedAction = (menuItemIdSelected: string) => {
		const action = actions.find(action => action._id === menuItemIdSelected);
		if (!action) {return undefined; }
		return (
			<PageAction action={action}/>
		);
	};
	const renderFallthroughPage = () => (
		<div>
			<Button variant='contained' color='primary' onClick={onTestButtonClicked}>Hello</Button>
			{receipts ? receipts.map(((schedule: any) => (
				<div>
					{JSON.stringify(schedule)}
				</div>
			))) : undefined}
		</div>
	);

	return (
		<LayoutAppHeader
			title={title} body={renderPageBody()}
			nav={renderPageNav()}
		/>
	);
});
