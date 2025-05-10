import { URL } from '../constants';
import { transformUser } from '../transformers';

export const createUser = (login, password) =>
	fetch(`${URL}/users`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			login,
			password,
			registred_at: new Date().toISOString(),
		}),
	})
		.then((user) => user.json())
		.then((user) => user && transformUser(user));
