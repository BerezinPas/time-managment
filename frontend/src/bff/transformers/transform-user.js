export const transformUser = (DBuser) => ({
	id: DBuser.id,
	login: DBuser.login,
	password: DBuser.password,
	registredAt: DBuser.registred_at,
});
