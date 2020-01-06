'use strict';

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {INavApp} from 'src/loader/TypedSidebarApps';
import {SidebarApplicationsLoader} from 'src/loader/SidebarApplicationsLoader';
import {useLocalizedResourcesFromContext} from 'src/mui-lib/hooks/useLanguage';
import {AppLanguagesSelector} from 'src/mui-views/app/AppLanguagesSelector';
import {SidebarApplications} from '../applications/SidebarApplicationsImporter';
import {AppNavigator} from '../components/AppNavigator';
import {URM} from '../resources/resources';
import {RB} from './resources';
import {useStyles} from './styles';

interface IProps {
	onSetLanguage: (language: string) => any;
}

if (window) {window['_$embedded'] = true;}
export const AppHome = React.memo(({onSetLanguage}: IProps) => {
	const cls = useStyles();
	const R = useLocalizedResourcesFromContext(RB);

	const [selected, setSelected] = React.useState(undefined as INavApp | undefined);

	const onMenuClick = (menu: INavApp) => {
		setSelected(menu);
		console.log('clicked', menu);
	};

	const renderAppBar = () => (
		<AppBar position='static'>
			<Toolbar>
				<div className={cls.headerLogoBox}><img className={cls.headerLogoImg} src={URM.logo}/></div>
				<Typography variant="h6" color="inherit" className={cls.headerTitle}>{R.title}</Typography>
				<AppLanguagesSelector onSetLanguage={onSetLanguage}/>
			</Toolbar>
		</AppBar>
	);

	const renderBody = () => (
		<div className={cls.body}>
			<div className={cls.nav}>
				<AppNavigator pages={SidebarApplications} onSelected={onMenuClick}/>
			</div>
			<div className={cls.content}>
				<SidebarApplicationsLoader pages={SidebarApplications} page={selected}/>
			</div>
		</div>
	);

	return (
		<div className={cls.container}>
			{renderAppBar()}
			{renderBody()}
		</div>
	);
});
