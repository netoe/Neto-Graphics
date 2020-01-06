//

import {ISidebarApp} from 'src/loader/TypedSidebarApps';
import {newBuiltinApp, newDynamicalApp} from 'src/loader/SidebarAppsConstructor';
import {URM} from '../resources/resources';
import {AppDashboards} from './AppDashboards';
import {AppNoting} from './AppNoting';
import {AppScheduler} from './AppScheduler';
import {AppWorkspace} from './AppWorkspace';
import {R} from './SidebarApplications.resources';

const newApp = newDynamicalApp;
const withApp = newBuiltinApp;

// @ts-ignore
// @see https://webpack.js.org/guides/public-path
__webpack_public_path__ = URM.pathPrefixDynamicalImports;
// @see https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import
const appDashboards = withApp(R.dashboards, AppDashboards);
const appWorkspace = withApp(R.workspace, AppWorkspace);
const appScheduler = withApp(R.schedules, AppScheduler);
const appNoting = withApp(R.noting, AppNoting);
const appCalendar = withApp(R.calendar, AppScheduler);

const appActivities = withApp(R.activities, AppWorkspace);
const appNews = withApp(R.newses, AppScheduler);

// Infra Tools
// const infraTextTailor = withApp(R.infraTextTailor, AppTextTailor);
const infraTextTailor = newApp(R.infraTextTailor, () => import(/* webpackChunkName: "AppTextTailor" */'./AppTextTailor'));

export const SidebarApplications: ISidebarApp[] = [
	appDashboards,
	appWorkspace,
	appScheduler,
	appNoting,
	appCalendar,
	appActivities,
	appNews,
	infraTextTailor,
];
