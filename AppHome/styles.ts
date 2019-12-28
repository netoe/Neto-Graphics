'use strict';

import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {_conf} from '../../core/app/configures';

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {height: '100%', display: 'flex', flexFlow: 'column'},

		headerLogoBox: {height: '45px', width: '45px', marginRight: 8},
		headerLogoImg: {height: '45px', width: '45px'},
		headerTitle: {fontWeight: 'bold', fontSize: '1.75em'},

		// @see https://github.com/zhanbei/Web-App-Layout#Fixed-Secondary-APP-Bar
		// Use a "overflow: auto" to keep the height flexible as the "flex: 1" expected.
		// Make the overflowed content, by mistakes if any, hidden in the production mode.
		body: {flex: 1, display: 'flex', overflowY: _conf.isDebuggingMode() ? 'auto' : 'hidden'},
		nav: {
			maxWidth: '120px', minWidth: '60px',
			overflowY: 'auto', // Make the navigator scrollable, if needed.
			overflowX: 'hidden', // Keep the horizontally overflowed content hidden, even when the labelled text is longer, like in English language.
			// Make the children full width, ignoring their padding and margins( or borders).
			// The "height: 100%" does not work, because of that.
			display: 'flex',
		},
		content: {flex: 1, background: '#eee'},
		page: {margin: '0 auto', maxWidth: 1080},
	}),
);
