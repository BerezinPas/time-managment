import { createUser, getUser } from '../api';
import { sessions } from '../sessions';

export const register = async (regLogin, regPassword) => {
	const existedUser = await getUser(regLogin);
	console.log('existedUser', existedUser);

	if (existedUser) {
		return {
			error: 'Такой логин уже занят',
			res: null,
		};
	}

	const user = await createUser(regLogin, regPassword);
	console.log('register user', user);

	return {
		error: null,
		res: {
			id: user.id,
			login: user.login,
			registredAt: user.registredAt,
			sessions: sessions.create(user),
		},
	};
};
