import { request } from '../utils';
import { RESET_PROJECTS_DATA } from './reset-projects-data';
import { setUser } from './set-user';

export const registerAsync = (login, password) => (dispatch) => {
	return request('/register', 'POST', { login, password }).then(
		({ res, error }) => {
			if (error) {
				return { res, error };
			}
			dispatch(setUser(res));
			dispatch(RESET_PROJECTS_DATA);
			sessionStorage.setItem('userData', JSON.stringify(res));
			return { res, error };
		},
	);
};
