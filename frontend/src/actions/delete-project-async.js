import { request } from '../utils';
import { deleteProject } from './delete-project';

export const deleteProjectAsync = (projectId) => (dispatch) => {
	return request(`/projects/${projectId}`, 'DELETE').then(({ error, res }) => {
		// TODO ALERT ERROR
		dispatch(deleteProject(projectId));
		return res;
	});
};
