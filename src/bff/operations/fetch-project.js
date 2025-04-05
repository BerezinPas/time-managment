import { getProject, getTreckedTimes } from '../api';

export const fetchProject = async (projectId) => {
	const project = await getProject(projectId);

	const treckedTimes = await getTreckedTimes(projectId);

	console.log(treckedTimes);
	console.log(Date.now());

	return {
		error: null,
		res: { ...project, treckedTimes },
	};
};
