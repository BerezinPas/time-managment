import { request } from '../utils';
import { setProject } from './set-project';

export const loadProjectAsync = (projectId, page, limit) => (dispatch) => {
	return request(`/projects/${projectId}?page=${page}&limit=${limit}`).then(
		({ error, res }) => {
			if (error) {
				return { error, res };
			}
			dispatch(setProject(res.project));
			return { error, res };
		},
	);
};
