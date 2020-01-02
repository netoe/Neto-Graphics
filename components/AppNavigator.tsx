//

import React from 'react';
import {INavApp} from 'src/loader/TypedAppsLoader';
import {usePreferredLanguageFromContext} from 'src/graphic/mui-lib/hooks/useLanguage';
import {MenuIconBox} from '../views/MenuIconBox';

interface IProps {
	pages: INavApp[];
	onSelected: (menu: INavApp) => any;
}

export const AppNavigator = React.memo<IProps>(({pages, onSelected}: IProps) => {
	// const cls = useStyles();
	const language = usePreferredLanguageFromContext();
	const [selected, setSelected] = React.useState(pages[0] as INavApp | undefined);
	const onMenuClick = (menu: INavApp) => {
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
					icon={page.icon} text={page[language] || page.text}
					selected={selected === page}
					onClick={() => onMenuClick(page)}
				/>
			))}
		</div>
	);
});