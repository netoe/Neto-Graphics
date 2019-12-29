// Load dynamical applications and cache.
//
// Strategy I:
// - Load the bunch of the builtin applications.
// - Load the bunch of the remote applications.
//
// Strategy II:
// - Load dynamical applications separately.
//
// The definitions and importers of dynamical applications.

import {IMenuItem} from '../components/AppNavigator';
import {ExtendedFetcherManager} from '../helpers/ExtendedFetcherManager';
import {URM} from '../resources/resources';
import {IBuiltinApplication} from './BuiltinApplications';
import {R} from './DynamicalApplications.resources';

export interface IDynamicalApp extends IMenuItem {
	doImport: () => Promise<IBuiltinApplication>;
	status: ExtendedFetcherManager<IBuiltinApplication>;
}

const newApp = (app: { icon: string, en: string, zh: string }, importer: () => Promise<IBuiltinApplication>): IDynamicalApp => {
	const text = app.en;
	const status = new ExtendedFetcherManager<IBuiltinApplication>();
	const doImport = () => importer().then(module => {
		status.fetched(module);
		console.log('Loaded module(%s):', text, module);
		return module;
	}).catch(ex => {
		status.failedToFetch(ex);
		throw ex;
	});
	return {
		id: `app-${text.trim().toLowerCase()}`,
		...app, text: app.en,
		doImport, status,
	};
};

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
