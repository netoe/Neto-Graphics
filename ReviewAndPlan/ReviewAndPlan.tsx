//

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {BridgeNetoCallback, getNetoCallbackBridge} from '../helpers/bridge-neto-callback';
import {R, RFF} from './resources';
import {useStyles} from './styles';

let title = R.title;

interface IProps {}

interface IState {}

export const ReviewAndPlan = React.memo<IProps>(() => {
	const cls = useStyles();

	const [patch, setPatch] = React.useState({} as object);

	const onTextChanged = ({target}: React.ChangeEvent<HTMLInputElement>) => {
		const {id, value} = target;
		setPatch({...patch, [id]: value.replace(/\n/g, '')});
	};

	const onCommitValues = () => {
		const bridge = getNetoCallbackBridge();
		console.log('patch:', patch);
		if (!bridge) {return console.error('Failed to resolve the neto bridge!');}
		if (!patch[RFF.plans.id] && !patch[RFF.plans.id]) {if (!confirm('Quit with the box(es) empty!')) {return; }}
		bridge.callback(BridgeNetoCallback.newSuccessiveResult({reviews: patch[RFF.reviews.id], plans: patch[RFF.plans.id]}));
	};

	const renderAppBar = () => (
		<AppBar position='static'>
			<Toolbar>
				<div className={cls.headerLogoBox}><img className={cls.headerLogoImg} src='/assets/images/icon.png'/></div>
				<Typography variant="h6" color="inherit" className={cls.headerTitle}>{title}</Typography>
			</Toolbar>
		</AppBar>
	);

	const renderBody = () => (
		<div className={cls.page}>
			<div>
				{RFF.fields.map(field => (
					<div className={cls.ctnTextField}>
						<TextField
							key={field.id} id={field.id} label={field.label}
							type="text" variant="outlined" fullWidth={true} multiline={true} rowsMax={3} InputLabelProps={{shrink: true}}
							onChange={onTextChanged} value={patch[field.id] || ''}
							autoFocus={field.autoFocus}
						/>
					</div>
				))}
			</div>

			<div className={cls.ctnButton}>
				<Button variant='contained' color='primary' onClick={onCommitValues}>{R.btnCommit}</Button>
			</div>

		</div>
	);

	return (
		<div className={cls.container}>
			{renderAppBar()}
			<div className={cls.body}>
				{renderBody()}
			</div>
		</div>
	);
});
