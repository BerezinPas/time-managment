import { URL } from '../constants';

export const deleteTrack = (id) =>
	fetch(`${URL}/tracks/${id}`, {
		method: 'DELETE',
	});
