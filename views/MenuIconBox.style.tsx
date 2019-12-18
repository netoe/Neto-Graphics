'use strict';

import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {builder} from '../resources/builder';

const iconSize = 76;
const styles = {
	container: {
		display: 'flex', flexFlow: 'column', alignItems: 'center', width: '96px', background: '#eee',
		margin: builder.isMenuItemRound() ? '8px 0' : '2px 0', padding: 8,
		borderRadius: builder.isMenuItemRound() ? '0 12px 12px 0' : undefined,
		cursor: 'pointer',
	},
	icon: {height: iconSize, width: iconSize, borderRadius: '50%'},
	text: {color: 'black', fontWeight: 'bold', fontSize: 'large'} as any,
};

export const useStyles = makeStyles((theme: Theme) => createStyles({
	container: styles.container,
	selectedContainer: {...styles.container, background: '#099'},
	iconBox: styles.icon,
	iconImage: styles.icon,
	textBox: {},
	textDiv: styles.text,
	selectedTextDiv: {...styles.text, color: 'white'},
}));

