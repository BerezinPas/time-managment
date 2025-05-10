import { server } from '../bff';
import { loadOptionsAsync } from './load-options-async';
import { loadProjectsAsync } from './load-projects-async';
import { setUser } from './set-user';

export const authorizateAsync = (login, password) => (dispatch) => {
	return server.authorizate(login, password).then(({ res, error }) => {
		if (error) {
			return { res, error };
		}
		dispatch(setUser(res));
		dispatch(loadProjectsAsync(res.id));
		dispatch(loadOptionsAsync(res.id));
		sessionStorage.setItem('userData', JSON.stringify(res));
		return { res, error };
	});
};
