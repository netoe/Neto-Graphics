'use strict';

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {useLocalizedResourcesFromContext} from 'src/graphic/mui-lib/hooks/useLanguage';
import {DynamicalApplications} from '../applications/DynamicalApplicationsImporter';
import {DynamicalApplicationsLoader} from '../applications/DynamicalApplicationsLoader';
import {AppNavigator, IMenuItem} from '../components/AppNavigator';
import {UN_LANGUAGES} from '../mui-lib/resources/languages';
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

	const [selected, setSelected] = React.useState(undefined as IMenuItem | undefined);

	console.log('scheduled language timer:', new Date());
	setTimeout(() => onSetLanguage(UN_LANGUAGES.CHINESE), 15 * 1000);

	const onMenuClick = (menu: IMenuItem) => {
		setSelected(menu);
		console.log('clicked', menu);
	};

	const renderAppBar = () => (
		<AppBar position='static'>
			<Toolbar>
				<div className={cls.headerLogoBox}><img className={cls.headerLogoImg} src={URM.logo}/></div>
				<Typography variant="h6" color="inherit" className={cls.headerTitle}>{R.title}</Typography>
			</Toolbar>
		</AppBar>
	);

	const renderBody = () => (
		<div className={cls.body}>
			<div className={cls.nav}>
				<AppNavigator pages={DynamicalApplications} onSelected={onMenuClick}/>
			</div>
			<div className={cls.content}>
				<DynamicalApplicationsLoader page={selected}/>
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
