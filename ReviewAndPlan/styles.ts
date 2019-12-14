'use strict';

import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {height: '100%', display: 'flex', flexFlow: 'column'},

		headerLogoBox: {height: '30px', width: '30px', marginRight: 8},
		headerLogoImg: {height: '30px', width: '30px'},
		headerTitle: {fontWeight: 'bold', fontSize: '1.5em'},

		body: {flex: 1, background: '#eee'},
		page: {margin: '0 auto', maxWidth: 1080},

		ctnTextField: {margin: '18px'},
		ctnButton: {margin: '0 18px'},
	}),
);
