// The App Bar for Embedded Applications

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export const useStyles = makeStyles({
	container: {height: '100%', display: 'flex', flexFlow: 'column'},
	ctnAppBar: {background: '#383'},
	headerTitle: {fontWeight: 'bold', fontSize: '1.5em'},
	// Make the body scrollable, referring the fixed header.
	body: {flex: 1, background: '#eee', overflow: 'auto'},
});

interface IProps {
	title: string;
	body: React.ReactNode;
}

export const LayoutEmbeddedApp = React.memo<IProps>(({title, body}, next, cls = useStyles()) => (
	<div className={cls.container}>
		<AppBar position='static' className={cls.ctnAppBar}>
			<Toolbar>
				<Typography variant="h6" color="inherit" className={cls.headerTitle}>{title}</Typography>
			</Toolbar>
		</AppBar>
		<div className={cls.body}>
			{body}
		</div>
	</div>
));
