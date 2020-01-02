//

import React from 'react';
import {Schedule} from 'src/core/scheduler/schedule';
import {GroupedButtons} from 'src/mui-lib/widgets/GroupedButtons';
import {GroupedIconButtons} from 'src/mui-lib/widgets/GroupedIconButtons';
import {EnumViewModes, ViewModeIconsDefaultDesktop} from 'src/mui-lib/widgets/GroupedViewModes';
import {CardSchedule} from '../views/CardSchedule';
import {RR} from './resources';
import {useStyles} from './styles';

type ISelectedTabKeys = 'schedules' | 'actions';

interface IProps {
	schedules: Schedule[];
	selectedTab: ISelectedTabKeys;
	onTabSelected: (key: ISelectedTabKeys) => any
}

export const PageSchedules = React.memo<IProps>(({schedules, selectedTab, onTabSelected}) => {
	const cls = useStyles();
	const tab = selectedTab === 'schedules' ? RR.tabSchedules.key : RR.tabActions.key;
	const [mode, setMode] = React.useState(EnumViewModes.Cards);

	const onTabChanged = (mode: number) => {
		onTabSelected(mode === RR.tabSchedules.key ? 'schedules' : 'actions');
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

	const renderUserSchedules = () => schedules.map(schedule => (
		<CardSchedule key={schedule.name} schedule={schedule}/>
	));

	return renderPageBody();
});
