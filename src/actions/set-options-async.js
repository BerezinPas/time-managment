import { server } from '../bff';
import { setOptions } from './set-options';

export const setOptionsAsync = (optionData) => (dispatch) => {
	// console.log('server.fetchProjects', server);

	return server.replaceOptions(optionData).then(({ error, res }) => {
		console.log('res', res);

		dispatch(setOptions(res));
	});
};
