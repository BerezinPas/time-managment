import { ACTION_TYPE } from '../actions/action-type';

const initialState = [];

export const projectsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_PROJECTS:
			return payload;

		default:
			return state;
	}
};
