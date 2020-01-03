'use strict';

import {Schedule} from 'src/core/scheduler/schedule';
import {IAction} from 'src/core/scheduler/typed/actions';
import {defineNewGroupedButton} from 'src/mui-lib/widgets/GroupedButtons';
import {getAppSecondaryMenu, IMenuSection, newMenuItem, newMenuSection} from 'src/mui-views/app/AppSecondaryMenu';
import {IMenuScriptItem} from '../Infra-Tools/Text-Tailor/AppMenus.resources';

export const R = {
	title: 'Scheduler',
	tabSchedules: '计划任务',
	tabActions: '行为功能',
};

export const AppSchedulerMenu = getAppSecondaryMenu<IMenuScriptItem, IMenuSection>();

const secSchedules: IMenuSection = newMenuSection('schedules', '计划任务', [
	newMenuItem('hourly', '整点计划'),
]);
const secActions: IMenuSection = newMenuSection('actions', '行为功能', [
	newMenuItem('notification-sound', '播放通知提示声'),
]);
const secOverview: IMenuSection = newMenuSection('overview', '总览', [
	newMenuItem(secSchedules._id, secSchedules.name + '总览'),
	newMenuItem(secActions._id, secActions.name + '总览'),
]);
const sections = [secOverview, secSchedules, secActions];
const getSections = (schedules: Schedule[], actions: IAction[]): IMenuSection[] => [
	{
		...secOverview,
	}, {
		...secSchedules,
		items: schedules.map(schedule => newMenuItem(schedule.name, schedule.name)),
	}, {
		...secActions,
		items: actions.map(action => newMenuItem(action._id, action.name)),
	},
];

const newButton = defineNewGroupedButton;
const tabSchedules = newButton(1, R.tabSchedules);
const tabActions = newButton(2, R.tabActions);
export const RR = {
	tabSchedules,
	tabActions,
	tabs: [tabSchedules, tabActions],

	sections,
	secOverview,
	secSchedules,
	secActions,
	getSections,
};
