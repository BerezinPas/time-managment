import { URL } from '../constants';

export const deleteTreckedTime = (id) =>
	fetch(`${URL}/trecked_times/${id}`, {
		method: 'DELETE',
	});
