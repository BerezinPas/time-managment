import { ACTION_TYPE } from '../actions/action-type';
import { calcSumDuration } from '../bff/utils';
import { formateTimeStampToHHMMSS } from '../utils';

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
			console.log('SET_PROJECT', payload);

			return state.map((project, index) =>
				project.id !== payload.id
					? project
					: {
							...state[index],
							...payload,
							tracks: payload.tracks.map((track) => track.id),
						},
			);

		// case ACTION_TYPE.CREATE_TRACK:
		// 	return state.map((project) =>
		// 		project.id !== payload.projectId
		// 			? project
		// 			: { ...project, tracks: [...project.tracks, payload] },
		// 	);

		// case ACTION_TYPE.UPDATE_TRACK:
		// 	return state.map((project) =>
		// 		project.id !== payload.projectId
		// 			? project
		// 			: {
		// 					...project,
		// 					tracks: project.tracks.map((track) =>
		// 						track.id !== payload.id ? track : payload,
		// 					),
		// 				},
		// 	);

		// case ACTION_TYPE.DELETE_TRACK:
		// 	return state.map((project) =>
		// 		project.id !== Number(payload.projectId)
		// 			? project
		// 			: {
		// 					...project,
		// 					tracks: project.tracks.filter(
		// 						(track) => Number(track.id) !== Number(payload.id),
		// 					),
		// 				},
		// 	);

		case ACTION_TYPE.RESET_PROJECTS_DATA:
		case ACTION_TYPE.LOGOUT:
			return initialState;

		default:
			return state;
	}
};
