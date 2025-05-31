import { request } from '../utils';
import { createTrack } from './create-track';

export const createTrackAsync = (projectId, track) => (dispatch) => {
	return request(`/projects/${projectId}`, 'PATCH', {
		tracks: {
			create: [track],
		},
	}).then(({ res }) => {
		dispatch(createTrack(res));
		return res;
	});
};
