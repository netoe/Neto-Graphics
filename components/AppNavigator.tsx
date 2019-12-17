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
		// There should be no "height: 100%" as it does make the real height larger than its parent
		// because of its padding/border/margin.
		<div style={{background: '#ddd', padding: '8px 2px 8px 0'}}>
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