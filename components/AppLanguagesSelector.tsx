//

import React from 'react';
import Button from '@material-ui/core/Button';
import IconLanguage from '@material-ui/icons/Translate';
import IconArrowDown from '@material-ui/icons/KeyboardArrowDown';
import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {UN_LANGUAGES as un} from 'src/mui-lib/resources/languages';

const useStyles = makeStyles({
	root: {maxWidth: 360},
});

const languages = [un.中文, un.ENGLISH, un.Español, un.Français, un.Русский, un.العربية];
const codes = [un.zh, un.en, un.es, un.fr, un.ru, un.ar];

interface IProps {
	onSetLanguage: (language: string) => any;
}

export const AppLanguagesSelector = React.memo(({onSetLanguage}: IProps) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [selectedIndex, setSelectedIndex] = React.useState(1);

	const onSelectLanguage = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const onLanguageSelected = (event: React.MouseEvent<HTMLElement>, index: number) => {
		console.log('index', index, codes[index], languages[index]);
		setSelectedIndex(index);
		onSetLanguage(codes[index]);
		setAnchorEl(null);
	};

	return (
		<div className={classes.root}>
			<Button color="inherit" startIcon={<IconLanguage/>} endIcon={<IconArrowDown/>} onClick={onSelectLanguage}>{languages[selectedIndex]}</Button>
			<Menu id="menu-languages-selector" open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
				{languages.map((option, index) => (
					<MenuItem key={option} selected={index === selectedIndex} onClick={event => onLanguageSelected(event, index)}>{option}</MenuItem>
				))}
			</Menu>
		</div>
	);
});
