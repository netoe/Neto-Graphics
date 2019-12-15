// The loader to load dynamical applications into the real dom.

import React from 'react';
import {IMenuItem} from '../components/AppNavigator';
import {DynamicalApplications, IDynamicalApp} from './DynamicalApplicationsImporter';

interface IProps {
	page?: IMenuItem;
}

const _loader = new Map<string, IDynamicalApp>();
DynamicalApplications.map(app => _loader.set(app.id, app));

export const DynamicalApplicationsLoader = React.memo<IProps>(({page}) => {
	const [code, doRefresh] = React.useState(1);
	const app = page ? _loader.get(page.id) || DynamicalApplications[0] : DynamicalApplications[0];
	console.log('DynamicalApplicationsLoader#refreshed:', code);
	if (!app) {return (<div>Error, Unexpected App ID.</div>);}
	const fetcher = app.status;
	if (fetcher.isInitialState()) {
		// Trigger to fetch the remote component.
		app.doImport().then(module => {
			// Notice the component the target module is loaded and available.
			// FIX-ME What about a slow loading, or fast switches between pages.
			doRefresh(code + 1);
		});
	}
	if (app.status.isFetching()) {return (<div>Loading the App.</div>);}
	if (app.status.isError() || app.status.isFailed()) {return (<div>Error, Error Encountered Loading the App</div>);}
	const Module = fetcher.getData();
	if (!Module) {return <div>Error, Expected App is not Loaded</div>;}
	return (
		<div>
			<Module.default/>
		</div>
	);
});
