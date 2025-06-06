import { ACTION_TYPE } from '../actions/action-type';

const initialState = [];

const initialProjectState = { id: null, name: '', tracks: [], userId: null };

export const projectsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_PROJECTS:
			return payload;

		case ACTION_TYPE.ADD_PROJECT:
			return [...state, { ...initialProjectState, ...payload }];

		case ACTION_TYPE.DELETE_PROJECT:
			return state.filter(({ id }) => id !== payload);

		case ACTION_TYPE.SET_PROJECT:
			return state.map((project, index) =>
				project.id !== payload.id
					? project
					: {
							...state[index],
							...payload,
							tracks: payload.tracks.map((track) => track.id),
						},
			);

		case ACTION_TYPE.RESET_PROJECTS_DATA:
		case ACTION_TYPE.LOGOUT:
			return initialState;

		default:
			return state;
	}
};
