//

import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			minWidth: 200,
			maxWidth: 260,
			backgroundColor: '#e8e8e8',
		},
		sectionHeader: {fontStyle: 'italic'},
		listSection: {
			backgroundColor: 'inherit',
		},
		ul: {
			backgroundColor: 'inherit',
			padding: 0,
		},
		menuItem: {fontWeight: 'bold', background: '#ddd', color: '#666'},
		menuItemFollowed: {marginTop: 1},
	}),
);

