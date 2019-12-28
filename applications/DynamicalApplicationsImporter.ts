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
import {AppHome as AppDashboards} from '../Neto-Dashboards/AppHome/AppHome';
import {URM} from '../resources/resources';
import {IBuiltinApplication} from './BuiltinApplications';

export interface IDynamicalApp extends IMenuItem {
	doImport: () => Promise<IBuiltinApplication>;
	status: ExtendedFetcherManager<IBuiltinApplication>;
}

const newApp = (icon: string, text: string, importer: () => Promise<IBuiltinApplication>): IDynamicalApp => {
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
		icon, text,
		doImport, status,
	};
};

// @ts-ignore
// @see https://webpack.js.org/guides/public-path
__webpack_public_path__ = URM.pathPrefixDynamicalImports;
// @see https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import
const appDashboards = newApp('dashboards.png', 'Dashboards', () => import(/* webpackChunkName: "AppDashboards" */'./AppDashboards'));
const appWorkspace = newApp('workspace.png', 'Workspace', () => import(/* webpackChunkName: "AppWorkspace" */'./AppWorkspace'));
const appScheduler = newApp('schedules.png', 'Schedules', () => import(/* webpackChunkName: "AppScheduler" */'./AppScheduler'));
const appNoting = newApp('noting.png', 'Notes', () => import(/* webpackChunkName: "AppWorkspace" */'./AppWorkspace'));
const appMarketplace = newApp('calendar.png', 'Calendar', () => import(/* webpackChunkName: "AppScheduler" */'./AppScheduler'));

const appActivities = newApp('activities.png', 'Activities', () => import(/* webpackChunkName: "AppScheduler" */'./AppWorkspace'));
const appNews = newApp('news.png', 'Subscriptions', () => import(/* webpackChunkName: "AppScheduler" */'./AppScheduler'));

// Infra Tools
const infraTextTailor = newApp('text-tailor.png', 'Text Tailor', () => import(/* webpackChunkName: "AppTextTailor" */'./AppTextTailor'));

export const DynamicalApplications: IDynamicalApp[] = [
	appDashboards,
	appWorkspace,
	appScheduler,
	appNoting,
	appMarketplace,
	appActivities,
	appNews,
	infraTextTailor,
];
