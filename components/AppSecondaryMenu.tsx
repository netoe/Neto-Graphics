//

import React from 'react';
import clsx from 'clsx';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			minWidth: 200,
			maxWidth: 260,
			backgroundColor: '#e8e8e8',
		},
		listSection: {
			backgroundColor: 'inherit',
		},
		ul: {
			backgroundColor: 'inherit',
			padding: 0,
		},
		menuItem: {fontWeight: 'bold', background: '#ddd'},
		menuItemFollowed: {marginTop: 1},
	}),
);

export interface IMenuItem {
	id: string;
	name: string;
}

export interface IMenuSection {
	id: string;
	name: string;
	items: IMenuItem[];
}

interface IProps {
	// Theme Color
	color: string;
	sections: IMenuSection[];
	selectedMenuItemId: string;
	onSelect: (entryId: string, item: IMenuItem) => any;
}

// Works like a router, providing the navigation functionality.
// 1. Simple Menus
// 2. Grouped Menus
// 3. Menu Options
// 4. Rich(Icon/Secondary-Text/+) Menu Items
export const AppSecondaryMenu = React.memo<IProps>(({color, sections, selectedMenuItemId, onSelect}) => {
	const cls = useStyles();

	const renderMenuItems = (item: IMenuItem, index: number) => (
		<ListItem
			key={item.id}
			button selected={selectedMenuItemId === item.id}
			onClick={() => onSelect(item.id, item)}
			className={clsx(cls.menuItem, {[cls.menuItemFollowed]: index > 0})}
			style={selectedMenuItemId === item.id ? {background: color, color: 'white'} : {color: '#666'}}
		>
			<ListItemText primary={item.name} style={{margin: '6px 0'}} disableTypography={true}/>
		</ListItem>
	);

	const renderSections = (section: IMenuSection) => (
		<li key={section.id} className={cls.listSection}>
			<ul className={cls.ul}>
				<ListSubheader style={{fontStyle: 'italic'}}>{section.name}</ListSubheader>
				{section.items.map(renderMenuItems)}
			</ul>
		</li>
	);

	return (
		<List className={cls.root}>
			{sections.map(renderSections)}
		</List>
	);
});
