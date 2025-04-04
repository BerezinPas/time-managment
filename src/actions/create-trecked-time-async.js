import { server } from '../bff';
import { createTreckedTime } from './create-trecked-time';

export const createTreckedTimeAsync = (treckedTimeData) => (dispatch) => {
	return server.addTreckedTime(treckedTimeData).then(({ res }) => {
		dispatch(createTreckedTime(res));
	});
};
