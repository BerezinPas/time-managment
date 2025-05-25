import { URL } from '../constants';

export const deleteProject = (projectId) =>
	fetch(`${URL}/projects/${projectId}`, {
		method: 'DELETE',
	});
