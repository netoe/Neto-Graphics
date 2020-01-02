//

import {IDynamicalApp} from 'src/loader/TypedAppsLoader';
import {newDynamicalApp} from 'src/loader/DynamicalAppConstructor';
import {URM} from '../resources/resources';
import {R} from './DynamicalApplications.resources';

const newApp = newDynamicalApp;

// @ts-ignore
// @see https://webpack.js.org/guides/public-path
__webpack_public_path__ = URM.pathPrefixDynamicalImports;
// @see https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import
const appDashboards = newApp(R.dashboards, () => import(/* webpackChunkName: "AppDashboards" */'./AppDashboards'));
const appWorkspace = newApp(R.workspace, () => import(/* webpackChunkName: "AppWorkspace" */'./AppWorkspace'));
const appScheduler = newApp(R.schedules, () => import(/* webpackChunkName: "AppScheduler" */'./AppScheduler'));
const appNoting = newApp(R.noting, () => import(/* webpackChunkName: "AppWorkspace" */'./AppWorkspace'));
const appCalendar = newApp(R.calendar, () => import(/* webpackChunkName: "AppScheduler" */'./AppScheduler'));

const appActivities = newApp(R.activities, () => import(/* webpackChunkName: "AppScheduler" */'./AppWorkspace'));
const appNews = newApp(R.newses, () => import(/* webpackChunkName: "AppScheduler" */'./AppScheduler'));

// Infra Tools
const infraTextTailor = newApp(R.infraTextTailor, () => import(/* webpackChunkName: "AppTextTailor" */'./AppTextTailor'));

export const DynamicalApplications: IDynamicalApp[] = [
	appDashboards,
	appWorkspace,
	appScheduler,
	appNoting,
	appCalendar,
	appActivities,
	appNews,
	infraTextTailor,
];
