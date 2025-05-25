import { createOptions, createUser, getUser } from '../api';

export const register = async (regLogin, regPassword) => {
	const existedUser = await getUser(regLogin);

	if (existedUser) {
		return {
			error: 'Такой логин уже занят',
			res: null,
		};
	}

	const user = await createUser(regLogin, regPassword);

	const options = await createOptions(user.id);

	return {
		error: null,
		res: { user, options },
	};
};
