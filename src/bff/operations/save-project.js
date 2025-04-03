import { createProject, updateProject } from '../api';

export const saveProject = async ({ id, name, userId }) => {
	const project =
		id === null ? await updateProject(name) : await createProject(name, userId);

	return {
		error: null,
		res: project,
	};
};
