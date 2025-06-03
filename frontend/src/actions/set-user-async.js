import { request } from '../utils';
import { setUser } from './set-user';

export const setUserAsync = (userData) => (dispatch) => {
	return request(`/users/`, 'PATCH', userData).then(({ error, res }) => {
		if (error) {
			return { error, res };
		}
		dispatch(setUser(res));
		console.log('setUserAsync');
		console.log(res);

		sessionStorage.setItem('userData', JSON.stringify(res));
		return res;
	});
};
