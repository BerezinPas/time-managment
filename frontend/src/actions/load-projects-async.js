import { request } from '../utils';
import { setProjects } from './set-projects';

export const loadProjectsAsync = () => (dispatch) => {
	return request('/projects').then(({ error, res }) => {
		dispatch(setProjects(res));
	});
};
