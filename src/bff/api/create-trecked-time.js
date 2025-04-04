import { URL } from '../constants';
import { transformTreckedTime } from '../transformers';

export const createTreckedTime = ({
	projectId,
	startTime,
	endTime,

	description,
}) =>
	fetch(`${URL}/trecked_times`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			project_id: projectId,
			start_time: startTime,
			end_time: endTime,
			description,
		}),
	})
		.then((treckedTime) => treckedTime.json())
		.then((treckedTime) => treckedTime && transformTreckedTime(treckedTime));
