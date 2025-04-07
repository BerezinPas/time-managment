import { server } from '../bff';
import { deleteProject } from './delete-project';

export const deleteProjectAsync = (projectId) => (dispatch) => {
	// console.log('deleteProjectAsync', server.removeProject);

	return server.removeProject(projectId).then(({ error, res }) => {
		dispatch(deleteProject(projectId));
	});
};
