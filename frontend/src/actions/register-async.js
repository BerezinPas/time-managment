import { server } from '../bff';
import { RESET_PROJECTS_DATA } from './reset-projects-data';
import { setOptions } from './set-options';
import { setUser } from './set-user';

export const registerAsync = (login, password) => (dispatch) => {
	return server.register(login, password).then(({ res, error }) => {
		if (error) {
			return { res, error };
		}
		dispatch(setUser(res.user));
		dispatch(setOptions(res.options));
		dispatch(RESET_PROJECTS_DATA);
		sessionStorage.setItem('userData', JSON.stringify(res));
		return { res, error };
	});
};
