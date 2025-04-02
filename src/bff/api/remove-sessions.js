import { URL } from '../constants';

export const removeSession = (id) =>
	fetch(`${URL}/sessions/${id}`, { method: 'DELETE' });
