import { ACTION_TYPE } from '../actions/action-type';

const initialState = [];

export const projectsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_PROJECTS:
			return payload;

		case ACTION_TYPE.ADD_PROJECT:
			return [...state, payload];

		case ACTION_TYPE.DELETE_PROJECT:
			return state.filter(({ id }) => id !== payload);

		default:
			return state;
	}
};
