'use strict';

import {Schedule} from '../../core/scheduler/schedule';
import {IMenuItem, IMenuSection} from '../components/AppSecondaryMenu';
import {defineNewGroupedButton} from '../mui-lib/widgets/GroupedButtons';

export const R = {
	title: 'Scheduler',
	tabSchedules: '计划任务',
	tabActions: '行为功能',
};

const newSection = (id: string, name: string, items: IMenuItem[]): IMenuSection => ({id, name, items});
const newMenuItem = (id: string, name: string): IMenuItem => ({id, name});
const secSchedules: IMenuSection = newSection('schedules', '计划任务', [
	newMenuItem('hourly', '整点计划'),
]);
const secActions: IMenuSection = newSection('actions', '行为功能', [
	newMenuItem('notification-sound', '播放通知提示声'),
]);
const secOverview: IMenuSection = newSection('overview', '总览', [
	newMenuItem(secSchedules.id, secSchedules.name + '总览'),
	newMenuItem(secActions.id, secActions.name + '总览'),
]);
const sections = [secOverview, secSchedules, secActions];
const getSections = (schedules: Schedule[]): IMenuSection[] => [
	{
		...secOverview,
	}, {
		...secSchedules,
		items: schedules.map(schedule => newMenuItem(schedule.name, schedule.name)),
	}, {
		...secActions,
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
