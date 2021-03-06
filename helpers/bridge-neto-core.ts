//

import {getNetoCoreBridge} from '../../bridges/BridgeNetoCore';

const bridge = getNetoCoreBridge();
export const getNetoBackgroundService = () => bridge ? bridge.BackgroundService : undefined;
export const getNetoDemoAndDevelopment = () => bridge ? bridge.DemoAndDevelopment : undefined;
export const getNetoScheduleReceiptsManager = () => bridge ? bridge.ScheduleReceiptsManager : undefined;
export const doReportTheLostOfNetoBridge = (conf: { alert?: boolean } = {}) => {
	// const message = 'The expected neto bridge is not found, please checkout your configures!';
	const message = 'The targeted feature is available on the desktop client; ' +
		'please download the desktop client to use the feature!';
	console.error(message);
	if (conf.alert) {alert(message);}
};
