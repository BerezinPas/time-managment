import { createOptions, createUser, getUser } from '../api';
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
	// console.log('register user', user);
	const options = await createOptions(user.id);

	return {
		error: null,
		res: { user, options },
	};
};
