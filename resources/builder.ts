'use strict';

// Applications may be built with configures.
// For experimental reasons or anything else.
// Application preferences can be users' preferences.
const conf = {
	menu: {
		size: 'large' as IMenuIconSize,
		style: 'round' as IMenuItemStyle,
	},
};

// Do not cache any values.
// Use the values dynamically.
const isMenuItemRound = (): boolean => conf.menu.style === 'round';
const getMenuIconSize = (): IMenuIconSize => conf.menu.size;

type IMenuIconSize = 'flexible' | 'large' | 'medium' | 'small'
type IMenuItemStyle = 'round' | 'square'

interface IPreferences {
	// May be flexible.
	menuIconSize: IMenuIconSize;
	menuItemStyle: IMenuItemStyle;
}

export const setBuilderOptions = ({menuIconSize, menuItemStyle}: IPreferences) => {
	if (menuIconSize !== undefined) {conf.menu.size = menuIconSize;}
	if (menuItemStyle !== undefined) {conf.menu.style = menuItemStyle;}
};

export const builder = {
	isMenuItemRound,
	getMenuIconSize,
};
