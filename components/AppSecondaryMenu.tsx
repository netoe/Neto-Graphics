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

interface IBaseMenuItem {
	id: string;
	name: string;
}

export interface IMenuItem extends IBaseMenuItem {}

export interface IMenuSection<T extends IMenuItem = IMenuItem> extends IBaseMenuItem {
	items: T[];
}

export const newMenuItem = (id: string, name: string): IMenuItem => ({id, name});
export const newMenuSection = <T extends IMenuItem>(id: string, name: string, items: T[]): IMenuSection<T> => ({id, name, items});

interface IProps<T extends IMenuItem, S extends IMenuSection<T>> {
	// Theme Color
	color: string;
	sections: S[];
	selectedMenuItemId: string;
	onSelect: (entryId: string, item: T, section: S) => any;
}

// Works like a router, providing the navigation functionality.
// 1. Simple Menus
// 2. Grouped Menus
// 3. Menu Options
// 4. Rich(Icon/Secondary-Text/+) Menu Items
const AppSecondaryMenu = React.memo(<T extends IMenuItem, S extends IMenuSection<T>>({color, sections, selectedMenuItemId, onSelect}: IProps<T, S>) => {
	const cls = useStyles();

	const renderMenuItems = (section: S, item: T, index: number) => (
		<ListItem
			key={item.id}
			button selected={selectedMenuItemId === item.id}
			onClick={() => onSelect(item.id, item, section)}
			className={clsx(cls.menuItem, {[cls.menuItemFollowed]: index > 0})}
			style={selectedMenuItemId === item.id ? {background: color, color: 'white'} : {color: '#666'}}
		>
			<ListItemText primary={item.name} style={{margin: '6px 0'}} disableTypography={true}/>
		</ListItem>
	);

	const renderSections = (section: S) => (
		<li key={section.id} className={cls.listSection}>
			<ul className={cls.ul}>
				<ListSubheader style={{fontStyle: 'italic'}}>{section.name}</ListSubheader>
				{section.items.map((item, index) => renderMenuItems(section, item, index))}
			</ul>
		</li>
	);

	return (
		<List className={cls.root}>
			{sections.map(renderSections)}
		</List>
	);
});

export const getAppSecondaryMenu = <T extends IMenuItem = IMenuItem, S extends IMenuSection<T> = IMenuSection<T>>(): React.FC<IProps<T, S>> => AppSecondaryMenu;
