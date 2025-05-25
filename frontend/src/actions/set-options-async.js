import { server } from '../bff';
import { setOptions } from './set-options';

export const setOptionsAsync = (optionData) => (dispatch) => {
	return server.replaceOptions(optionData).then(({ error, res }) => {
		console.log('res', res);

		dispatch(setOptions(res));
	});
};
