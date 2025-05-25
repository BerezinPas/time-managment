import { ACTION_TYPE } from '../actions/action-type';

export const initialStateProject = {
	id: null,
	name: '',
	tracks: [],
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

		case ACTION_TYPE.CREATE_TRACK:
			return {
				...state,
				tracks: [...state.tracks, payload],
			};

		case ACTION_TYPE.UPDATE_TRACK:
			return {
				...state,
				tracks: [
					...state.tracks.map((el) => (el.id === payload.id ? payload : el)),
				],
			};

		case ACTION_TYPE.DELETE_TRACK:
			return {
				...state,
				tracks: [...state.tracks.filter((el) => el.id !== payload)],
			};

		case ACTION_TYPE.RESET_PROJECT_DATA:
			return initialStateProject;

		default:
			return state;
	}
};
