'use strict';

import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const iconSize = 76;
const styles = {
	container: {
		display: 'flex', flexFlow: 'column', alignItems: 'center', width: '96px', margin: '2px 0', background: '#eee',
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

