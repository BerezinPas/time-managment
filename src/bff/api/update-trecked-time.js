import { URL } from '../constants';
import { transformTreckedTime } from '../transformers';

export const updateTreckedTime = ({ id, startTime, endTime, description }) =>
	fetch(`${URL}/trecked_times/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			start_time: startTime,
			end_time: endTime,
			description,
		}),
	})
		.then((treckedTime) => treckedTime.json())
		.then((treckedTime) => treckedTime && transformTreckedTime(treckedTime));
