import { deleteProject } from '../api';

export const removeProject = async (projectId) => {
	await deleteProject(projectId);

	return {
		error: null,
		res: true,
	};
};
