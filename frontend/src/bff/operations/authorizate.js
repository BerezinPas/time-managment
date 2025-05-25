import { getUser } from '../api';
import { sessions } from '../sessions';

export const authorizate = async (authLogin, authPassword) => {
	const user = await getUser(authLogin);
	if (!user) {
		return {
			error: 'Пользователь не найден',
			res: null,
		};
	}

	if (user.password !== authPassword) {
		return {
			error: 'Неверный пароль',
			res: null,
		};
	}

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
