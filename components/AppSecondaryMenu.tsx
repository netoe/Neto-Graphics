//

import React from 'react';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import {useStyles} from './AppSecondaryMenu.styles';

interface IBaseMenuItem {
	// Be clear about which one is better, is it configurable or compatible?
	// Yes, use two interfaces and one mixed type(id|_id).
	_id: string;
	name: string;
	// The selected background color.
	color?: string;
}

export interface IMenuItem extends IBaseMenuItem {}

// Serves for similar summary pages, like overview(s of kinds of assets), preferences, or other standalone pages.
export interface IMenuSummaryPage extends IMenuItem {
	description?: string;
}

export interface IMenuSection<T extends IMenuItem = IMenuItem> extends IBaseMenuItem {
	items: T[];
}

export const newMenuItem = (id: string, name: string): IMenuItem => ({_id: id, name});
export const newMenuSummaryItem = (id: string, name: string, description?: string): IMenuSummaryPage => ({...newMenuItem(id, name), description});
export const newMenuSection = <T extends IMenuItem>(id: string, name: string, items: T[]): IMenuSection<T> => ({_id: id, name, items});

interface IProps<T extends IMenuItem, S extends IMenuSection<T>> {
	// Theme Color
	color?: string;
	background?: string;

	// The text color of unselected items.
	itemColor?: string;
	// The background of unselected items.
	itemBackground?: string;

	sections: S[];
	selectedMenuItemId?: string;
	onSelect: (entryId: string, item: T, section: S) => any;
}

// Works like a router, providing the navigation functionality.
// 1. Simple Menus
// 2. Grouped Menus
// 3. Menu Options
// 4. Rich(Icon/Secondary-Text/+) Menu Items
const AppSecondaryMenu = React.memo(<T extends IMenuItem, S extends IMenuSection<T>>(
	{
		sections,
		selectedMenuItemId, onSelect,
		color, background,
		itemColor, itemBackground,
	}: IProps<T, S>,
) => {
	const cls = useStyles();

	const renderMenuItems = (section: S, item: T, index: number) => (
		<ListItem
			key={item._id}
			button selected={selectedMenuItemId === item._id}
			onClick={() => onSelect(item._id, item, section)}
			className={clsx(cls.menuItem, {[cls.menuItemFollowed]: index > 0})}
			style={selectedMenuItemId === item._id ? {background: item.color || color, color: 'white'} : {background: itemBackground, color: itemColor}}
		>
			<ListItemText primary={item.name} style={{margin: '6px 0'}} disableTypography={true}/>
		</ListItem>
	);

	const renderSections = (section: S) => (
		<li key={section._id} className={cls.listSection}>
			<ul className={cls.ul}>
				<ListSubheader className={cls.sectionHeader} style={{color}}>{section.name}</ListSubheader>
				{section.items.map((item, index) => renderMenuItems(section, item, index))}
			</ul>
		</li>
	);

	return (
		<List className={cls.root} style={{background}}>
			{sections.map(renderSections)}
		</List>
	);
});

export const getAppSecondaryMenu = <T extends IMenuItem = IMenuItem, S extends IMenuSection<T> = IMenuSection<T>>(): React.FC<IProps<T, S>> => AppSecondaryMenu;

export const AppSecondaryMenuGroup = React.memo(({children}) => {
	const cls = useStyles();
	// How to write the codes of simple components in fewer lines?
	return (
		<div className={cls.group}>{children}</div>
	);
});
