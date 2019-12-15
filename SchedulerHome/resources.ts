'use strict';

import {defineNewGroupedButton, IGroupedButton} from '../mui-lib/controllers/GroupedButtons';

export const R = {
	title: 'Scheduler',
	tabSchedules: '计划任务',
	tabActions: '行为功能',
};

const newButton = defineNewGroupedButton;
const tabSchedules = newButton(1, R.tabSchedules);
const tabActions = newButton(2, R.tabActions);
export const RR = {
	tabSchedules,
	tabActions,
	tabs: [tabSchedules, tabActions],
};
