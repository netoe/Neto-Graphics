'use strict';

import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {height: '100%', display: 'flex', flexFlow: 'column'},

		headerLogoBox: {height: '45px', width: '45px', marginRight: 8},
		headerLogoImg: {height: '45px', width: '45px'},
		headerTitle: {fontWeight: 'bold', fontSize: '1.75em'},

		body: {flex: 1, background: '#eee'},
		page: {margin: '0 auto', maxWidth: 1080},
	}),
);
