'use strict';

import React from 'react';
import Button from '@material-ui/core/Button';
import {IScheduleReceipt} from '../../core/scheduler/typed/receipts';
import {LayoutEmbeddedApp} from '../components/LayoutEmbeddedApp';
import {doReportTheLostOfNetoBridge, getNetoDemoAndDevelopment, getNetoScheduleReceiptsManager} from '../helpers/bridge-neto-core';
import {GroupedButtons} from '../mui-lib/controllers/GroupedButtons';
import {GroupedIconButtons} from '../mui-lib/controllers/GroupedIconButtons';
import {EnumViewModes, ViewModeIconsDefaultDesktop} from '../mui-lib/controllers/GroupedViewModes';
import {R, RR} from './resources';
import {useStyles} from './styles';

const ScheduleReceiptsManager = getNetoScheduleReceiptsManager();

let title = R.title;

interface IProps {}

export const SchedulerHome = React.memo<IProps>(() => {
	const cls = useStyles();
	const [mode, setMode] = React.useState(EnumViewModes.Cards);
	const [tab, setTab] = React.useState(RR.tabSchedules.key);
	const [NetoDemoAndDevelopment] = React.useState(getNetoDemoAndDevelopment);
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

	const onTabChanged = (mode: number) => {
		setTab(mode);
	};

	const onModeChanged = (mode: number) => {
		setMode(mode);
	};

	const renderPageBody = () => (
		<div className={cls.page} style={{padding: 18}}>
			{renderHeaderTabsAndOptions()}
			<Button variant='contained' color='primary' onClick={onTestButtonClicked}>Hello</Button>
			{receipts ? receipts.map(((schedule: any) => (
				<div>
					{JSON.stringify(schedule)}
				</div>
			))) : undefined}
		</div>
	);

	const renderHeaderTabsAndOptions = () => (
		<div className={cls.ctnBodyHeader}>
			<GroupedButtons
				buttons={RR.tabs} size='large' color='secondary'
				mode={tab} onChange={onTabChanged}
			/>
			<br/><br/>
			<GroupedIconButtons
				icons={ViewModeIconsDefaultDesktop} color={'#099'}
				mode={mode} onChange={onModeChanged}
			/>
		</div>
	);

	return (
		<LayoutEmbeddedApp
			title={title} body={renderPageBody()}
		/>
	);
});
