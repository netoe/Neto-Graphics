//

import React from 'react';
import {LayoutAppHeader} from '../components/LayoutAppHeader';
import {R} from './resources';
import {useStyles} from './styles';

let title = R.title;

interface IProps {}

export const WorkspaceHome = React.memo<IProps>(() => {
	const cls = useStyles();

	const renderPageBody = () => (
		<div className={cls.page} style={{padding: 18}}>
			<h1>Hello, this is the primary workspace of Neto Desktop.</h1>
		</div>
	);

	return (
		<LayoutAppHeader
			title={title} body={renderPageBody()}
		/>
	);
});
