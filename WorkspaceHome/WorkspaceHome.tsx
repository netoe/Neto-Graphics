//

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {URM} from '../resources/resources';
import {R} from './resources';
import {useStyles} from './styles';

let title = R.title;

interface IProps {}

interface IState {}

export const WorkspaceHome = React.memo<IProps>(() => {
	const cls = useStyles();

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
			{renderPageBody()}
		</div>
	);

	const renderPageBody = () => (
		<div className={cls.page} style={{padding: 18}}>
			<h1>Hello, this is the primary workspace of Neto Desktop.</h1>
		</div>
	);

	return (
		<div className={cls.container}>
			{renderAppBar()}
			{renderBody()}
		</div>
	);
});
