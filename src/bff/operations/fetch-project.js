import { getProject, getTreckedTimes } from '../api';

export const fetchProject = async (projectId) => {
	const project = await getProject(projectId);

	const treckedTimes = await getTreckedTimes(projectId);

	return {
		error: null,
		res: { ...project, treckedTimes },
	};
};
