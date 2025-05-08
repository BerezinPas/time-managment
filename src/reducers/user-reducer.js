import { ACTION_TYPE } from '../actions/action-type';

const userInitialState = {
	id: null,
	login: '',
	registredAt: '',
	isReady: false,
};

export const userReducer = (state = userInitialState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				isReady: true,
				...payload,
			};
		case ACTION_TYPE.SET_USER_IS_READY:
			return {
				...state,
				isReady: true,
			};
		default:
			return state;
	}
};
