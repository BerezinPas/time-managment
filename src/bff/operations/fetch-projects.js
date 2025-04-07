import { getProjects } from '../api';

export const fetchProjects = async (userId) => {
	const projects = await getProjects(userId);
	// console.log('fetchProjects', userId);

	return {
		error: null,
		res: projects,
	};
};
