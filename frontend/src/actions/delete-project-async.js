import { request } from '../utils';
import { deleteProject } from './delete-project';

export const deleteProjectAsync = (projectId) => (dispatch) => {
	return request(`/projects/${projectId}`, 'DELETE').then(({ error, res }) => {
		if (error) {
			return { error, res };
		}
		dispatch(deleteProject(projectId));
		return { error, res };
	});
};
