import { URL } from '../constants';
import { transformUser } from '../transformers';
import { createDate } from '../utils';

export const createUser = (login, password) =>
	fetch(`${URL}/users`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			login,
			password,
			registred_at: createDate(),
		}),
	})
		.then((user) => user.json())
		.then((user) => user && transformUser(user));
