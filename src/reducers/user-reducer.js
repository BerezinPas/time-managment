import { ACTION_TYPE } from '../actions/action-type';

const userInitialState = {
	id: null,
	login: '',
	registredAt: '',
};

export const userReducer = (state = userInitialState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				...payload,
			};
		default:
			return state;
	}
};
