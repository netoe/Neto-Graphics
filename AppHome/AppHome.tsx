'use strict';

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {DynamicalApplications} from '../applications/DynamicalApplicationsImporter';
import {DynamicalApplicationsLoader} from '../applications/DynamicalApplicationsLoader';
import {AppNavigator, IMenuItem} from '../components/AppNavigator';
import {URM} from '../resources/resources';
import {R} from './resources';
import {useStyles} from './styles';

let title = R.title;

interface IProps {}

export const AppHome = React.memo<IProps>(() => {
	const cls = useStyles();

	const [selected, setSelected] = React.useState(undefined as IMenuItem | undefined);

	const onMenuClick = (menu: IMenuItem) => {
		setSelected(menu);
		console.log('clicked', menu);
	};

	const renderAppBar = () => (
		<AppBar position='static'>
			<Toolbar>
				<div className={cls.headerLogoBox}><img className={cls.headerLogoImg} src={URM.logo}/></div>
				<Typography variant="h6" color="inherit" className={cls.headerTitle}>{title}</Typography>
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
