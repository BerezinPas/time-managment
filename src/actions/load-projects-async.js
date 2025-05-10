import { server } from '../bff';
import { setProjects } from './set-projects';

export const loadProjectsAsync = (userId) => (dispatch) => {
	return server.fetchProjects(userId).then(({ error, res }) => {
		dispatch(setProjects(res));
	});
};
