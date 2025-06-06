import { request } from '../utils';
import { createTrack } from './create-track';

export const createTrackAsync = (projectId, track) => (dispatch) => {
	return request(`/projects/${projectId}`, 'PATCH', {
		tracks: {
			create: [track],
		},
	}).then(({ res, error }) => {
		if (error) {
			return { res, error };
		}
		dispatch(createTrack(res));
		return { res, error };
	});
};
