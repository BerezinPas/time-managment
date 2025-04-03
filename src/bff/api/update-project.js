import { URL } from '../constants';

export const updateProject = (name, treckedTimes) =>
	fetch(`${URL}/projects`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			name,
			trecked_times: treckedTimes,
		}),
	});
