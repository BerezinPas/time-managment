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
			console.log('SET__USER', payload);

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

		case ACTION_TYPE.LOGOUT:
			return {
				...userInitialState,
				isReady: true,
			};

		default:
			return state;
	}
};
