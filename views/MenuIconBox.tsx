'use strict';

import React from 'react';
import {URM} from '../resources/resources';
import {useStyles} from './MenuIconBox.style';

interface IProps {
	icon: string;
	text: string;
	selected: boolean;
	onClick: () => any;
}

interface IState {}

export const MenuIconBox = React.memo<IProps>(({icon, text, selected, onClick}: IProps) => {
	const cls = useStyles();
	return (
		<div className={selected ? cls.selectedContainer : cls.container} onClick={onClick}>
			<div className={cls.iconBox}>
				<img className={cls.iconImage} src={URM.getAppImageUrl(icon)}/>
			</div>
			<div className={cls.textBox}>
				<div className={selected ? cls.selectedTextDiv : cls.textDiv}>{text}</div>
			</div>
		</div>
	);
});