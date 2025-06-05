import { request } from '../utils';
import { ACTION_TYPE } from './action-type';

export const logout = () => {
	// TODO async thunk
	request('/logout', 'POST');
	sessionStorage.removeItem('userData');
	return { type: ACTION_TYPE.LOGOUT };
};
