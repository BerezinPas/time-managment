import { request } from '../utils';
import { ACTION_TYPE } from './action-type';

export const logout = () => (dispatch) => {
	return request('/logout', 'POST').then(({ res, error }) => {
		if (error) {
			return { res, error };
		}
		dispatch({ type: ACTION_TYPE.LOGOUT });
		sessionStorage.removeItem('userData');
		return { res, error };
		// return { type: ACTION_TYPE.LOGOUT };
	});
};
