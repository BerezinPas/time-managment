export const authorizate = async (login, paswword) => {
	const user = await getUser(login);
	if (!user) {
		return {
			error: 'not found',
			res: null,
		};
	}
};
