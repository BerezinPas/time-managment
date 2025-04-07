import { server } from '../bff';
import { setProjects } from './set-projects';

export const loadProjectsAsync = (userId) => (dispatch) => {
	// console.log('server.fetchProjects', server);

	return server.fetchProjects(userId).then(({ error, res }) => {
		dispatch(setProjects(res));
	});
};
