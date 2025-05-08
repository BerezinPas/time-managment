import { server } from '../bff';
import { setOptions } from './set-options';

export const loadOptionsAsync = (userId) => (dispatch) => {
	return server.fetchOptions(userId).then(({ error, res }) => {
		console.log('res', res);

		dispatch(setOptions(res));
	});
};
