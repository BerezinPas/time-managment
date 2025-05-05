import { server } from '../bff';
import { createTrack } from './create-track';

export const createTrackAsync = (treckedTimeData) => (dispatch) => {
	return server.addTreckedTime(treckedTimeData).then(({ res }) => {
		dispatch(createTrack(res));
	});
};
