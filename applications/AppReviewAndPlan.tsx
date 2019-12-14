//

import React from 'react';
import ReactDOM from 'react-dom';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {appMuiTheme} from '../resources/AppTheme';
import {ReviewAndPlan} from '../ReviewAndPlan/ReviewAndPlan';

ReactDOM.render((
		<MuiThemeProvider theme={appMuiTheme}>
			<ReviewAndPlan/>
		</MuiThemeProvider>
	), document.getElementById('root-react-mount-point'),
);
