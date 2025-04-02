import { URL } from '../constants';
import { transformUser } from '../transformers';

export const getUser = (login) =>
	fetch(`${URL}/users?login=${login}`)
		.then((user) => user.json())
		.then(([user]) => user && transformUser(user));
