import { getProject } from '../api';

export const fetchProject = async (projectId) => {
	const project = await getProject(projectId);

	return {
		error: null,
		res: project,
	};
};
