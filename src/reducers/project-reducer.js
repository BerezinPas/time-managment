import { ACTION_TYPE } from '../actions/action-type';

export const initialStateProject = {
	id: null,
	name: '',
	treckedTimes: [],
};

export const projectReducer = (
	state = initialStateProject,
	{ type, payload },
) => {
	switch (type) {
		case ACTION_TYPE.SET_PROJECT:
			return {
				...state,
				...payload,
			};

		case ACTION_TYPE.CREATE_TRECKED_TIME:
			return {
				...state,
				treckedTimes: [...state.treckedTimes, payload],
			};

		case ACTION_TYPE.UPDATE_TRECKED_TIME:
			return {
				...state,
				treckedTimes: [
					...state.treckedTimes.map((el) =>
						el.id === payload.id ? payload : el,
					),
				],
			};

		case ACTION_TYPE.DELETE_TRECKED_TIME:
			return {
				...state,
				treckedTimes: [...state.treckedTimes.filter((el) => el.id !== payload)],
			};

		case ACTION_TYPE.RESET_PROJECT_DATA:
			return initialStateProject;

		default:
			return state;
	}
};
