import { request } from '../utils';
import { loadProjectsAsync } from './load-projects-async';
import { setUser } from './set-user';

export const authorizateAsync = (login, password) => (dispatch) => {
	return request('/login', 'POST', { login, password }).then(
		({ res, error }) => {
			if (error) {
				return { res, error };
			}
			return dispatch(loadProjectsAsync(res.id)).then(() => {
				dispatch(setUser(res));
				sessionStorage.setItem('userData', JSON.stringify(res));
				return { res, error };
			});
		},
	);
};
