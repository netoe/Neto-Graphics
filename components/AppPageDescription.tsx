//

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles({
	ctnPageDescription: {fontWeight: 'bold', color: '#099', padding: '8px'},
});

interface IProps {
	description?: string
}

export const AppPageDescription = React.memo(({description}: IProps) => {
	const cls = useStyles();
	if (!description) {return <div/>;}
	return (
		<div className={cls.ctnPageDescription}>{description}</div>
	);
});
