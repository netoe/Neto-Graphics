//

import React from 'react';
import {MenuIconBox} from '../views/MenuIconBox';

export interface IMenuItem {
	id: string;
	text: string;
	icon: string;
}

interface IProps {
	pages: IMenuItem[];
	onSelected: (menu: IMenuItem) => any;
}

export const AppNavigator = React.memo<IProps>(({pages, onSelected}: IProps) => {
	// const cls = useStyles();
	const [selected, setSelected] = React.useState(pages[0] as IMenuItem | undefined);
	const onMenuClick = (menu: IMenuItem) => {
		if (selected === menu) {return;}
		onSelected(menu);
		setSelected(menu);
	};
	return (
		<div style={{background: '#ddd', height: '100%', padding: '8px 0'}}>
			{pages.map((page, index) => (
				<MenuIconBox
					key={index}
					icon={page.icon} text={page.text}
					selected={selected === page}
					onClick={() => onMenuClick(page)}
				/>
			))}
		</div>
	);
});