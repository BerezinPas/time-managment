import { request } from '../utils';
import { setProject } from './set-project';

export const loadProjectAsync = (projectId) => (dispatch) => {
	return request(`/projects/${projectId}`).then(({ error, res }) => {
		if (error) {
			return { error, res };
		}
		dispatch(setProject(res));
		return { error, res };
	});
};
