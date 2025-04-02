import { ACTION_TYPE } from '../actions/action-type';

const initialState = {
	id: null,
	login: '',
	registred_at: '',
};

export const appReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		default:
			return state;
	}
};
