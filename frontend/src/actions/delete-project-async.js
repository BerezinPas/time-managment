import { server } from '../bff';
import { deleteProject } from './delete-project';

export const deleteProjectAsync = (projectId, tracksId) => (dispatch) => {
	return server.removeProject(projectId, tracksId).then(({ error, res }) => {
		dispatch(deleteProject(projectId));
		return res;
	});
};
