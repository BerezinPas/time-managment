import { URL } from '../constants';
import { transformTrack } from '../transformers';

export const updateTrack = ({ id, startTime, endTime, description }) =>
	fetch(`${URL}/tracks/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			start_time: startTime,
			end_time: endTime,
			description,
		}),
	})
		.then((tracks) => tracks.json())
		.then((tracks) => tracks && transformTrack(tracks));
