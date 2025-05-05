import { URL } from '../constants';
import { transformTrack } from '../transformers';

export const createTrack = ({
	projectId,
	startTime,
	endTime,

	description,
}) =>
	fetch(`${URL}/tracks`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			project_id: projectId,
			start_time: startTime,
			end_time: endTime,
			description,
		}),
	})
		.then((track) => track.json())
		.then((track) => track && transformTrack(track));
