'use strict';

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {AppNavigator, IMenuItem} from '../components/AppNavigator';
import {R} from './resources';
import {useStyles} from './styles';

let title = R.title;

interface IProps {}

interface IState {}

export const AppHome = React.memo<IProps>(() => {
	const cls = useStyles();

	const [selected, setSelected] = React.useState(undefined as IMenuItem | undefined);

	const ScheduleReceiptsManager: any = window['_NetoScheduleReceiptsManager'];
	const receipts: any = ScheduleReceiptsManager ? ScheduleReceiptsManager.receipts : undefined;

	console.log('found receipts:', receipts);

	const onMenuClick = (menu: IMenuItem) => {
		setSelected(menu);
		console.log('clicked', menu);
	};

	const renderAppBar = () => (
		<AppBar position='static'>
			<Toolbar>
				<div className={cls.headerLogoBox}><img className={cls.headerLogoImg} src='icon.png'/></div>
				<Typography variant="h6" color="inherit" className={cls.headerTitle}>{title}</Typography>
			</Toolbar>
		</AppBar>
	);

	const renderBody = () => (
		<div className={cls.body}>
			<div className={cls.nav}>
				<AppNavigator pages={R.pages} onSelected={onMenuClick}/>
			</div>
			<div className={cls.content}>
				{renderPageBody()}
			</div>
		</div>
	);

	const renderPageBody = () => (
		<div className={cls.page}>
			<Button variant='contained' color='primary'>Hello {JSON.stringify(selected)}</Button>
			{receipts ? receipts.map(((schedule: any) => (
				<div>
					{JSON.stringify(schedule)}
				</div>
			))) : undefined}
		</div>
	);

	return (
		<div className={cls.container}>
			{renderAppBar()}
			{renderBody()}
		</div>
	);
});
