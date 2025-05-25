export const transformProject = (DBproject) => ({
	id: DBproject.id,
	userId: DBproject.user_id,
	name: DBproject.name,
});
