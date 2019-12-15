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
const appWorkspace = newApp('icon.png', 'Workspace', () => import(/* webpackChunkName: "AppWorkspace" */'./AppWorkspace'));
const appScheduler = newApp('icon.png', 'Scheduler', () => import(/* webpackChunkName: "AppScheduler" */'./AppScheduler'));
export const DynamicalApplications: IDynamicalApp[] = [
	appWorkspace,
	appScheduler,
];
