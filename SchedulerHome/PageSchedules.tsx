//

import React from 'react';
// FIXME About the imports of interfaces; always keep the definitions of types separated.
import {IScheduleReceipt} from '../../core/scheduler/typed/receipts';
// FIXME For neto web applications.
import {mDemoSchedules} from '../../core/schedulerx/demo-schedules';
import {GroupedButtons} from '../mui-lib/widgets/GroupedButtons';
import {GroupedIconButtons} from '../mui-lib/widgets/GroupedIconButtons';
import {EnumViewModes, ViewModeIconsDefaultDesktop} from '../mui-lib/widgets/GroupedViewModes';
import {CardSchedule} from '../views/CardSchedule';
import {RR} from './resources';
import {useStyles} from './styles';

interface IProps {}

export const PageSchedules = React.memo<IProps>(() => {
	const cls = useStyles();
	const [mode, setMode] = React.useState(EnumViewModes.Cards);
	const [tab, setTab] = React.useState(RR.tabSchedules.key);
	const [receipts] = React.useState(undefined as IScheduleReceipt[] | undefined);

	console.log('found receipts:', receipts);

	const onTabChanged = (mode: number) => {
		setTab(mode);
	};

	const onModeChanged = (mode: number) => {
		setMode(mode);
	};

	const renderPageBody = () => (
		<div>
			{renderHeaderTabsAndOptions()}
			{renderUserSchedules()}
		</div>
	);

	const renderHeaderTabsAndOptions = () => (
		<div className={cls.ctnBodyHeader}>
			<div className={cls.ctnHeaderTabs}>
				<GroupedButtons
					buttons={RR.tabs} size='large' color='secondary'
					mode={tab} onChange={onTabChanged}
				/>
			</div>
			<div className={cls.ctnHeaderOptions}>
				<GroupedIconButtons
					icons={ViewModeIconsDefaultDesktop} color={'#099'}
					mode={mode} onChange={onModeChanged}
				/>
			</div>
		</div>
	);

	const renderUserSchedules = () => mDemoSchedules.map(schedule => (
		<CardSchedule key={schedule.name} schedule={schedule}/>
	));

	return renderPageBody();
});