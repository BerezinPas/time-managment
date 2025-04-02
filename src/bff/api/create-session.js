import { URL } from '../constants';

export const createSession = (hash, user) =>
	fetch(`${URL}/sessions`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			hash,
			user: {
				id: user.id,
				login: user.login,
				password: user.password,
				registred_at: user.registredAt,
			},
		}),
	});
