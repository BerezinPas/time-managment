import { ACTION_TYPE } from '../actions/action-type';

const initialState = {
	id: null,
	name: '',
	treckedTimes: [],
};

export const projectReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_PROJECT:
			console.log('projectReducer', payload);

			return {
				...state,
				...payload,
			};

		default:
			return state;
	}
};
