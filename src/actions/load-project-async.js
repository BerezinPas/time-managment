import { server } from '../bff';
import { setProject } from './set-project';

export const loadProjectAsync = (projectId) => (dispatch) => {
	return server.fetchProject(projectId).then(({ error, res }) => {
		dispatch(setProject(res));
	});
};
