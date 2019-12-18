'use strict';

import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		ctnPaper: {padding: 18, minHeight: 750},
		ctnPageTitle: {fontWeight: 'bold', color: '#099', padding: '8px'},
		ctnContent: {display: 'flex'},
		ctnContentDetails: {flex: 1, margin: '16px 36px'},
		ctnContentSection: {flex: 1, margin: 18},
	}),
);
