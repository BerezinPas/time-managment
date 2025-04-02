import { server } from '../bff/server';
import { setProjects } from './set-projects';

export const loadProjectsAsync = (userId) => (dispatch) => {
	return server.fetchProjects(userId).then(({ error, res }) => {
		dispatch(setProjects(res));
	});
};
