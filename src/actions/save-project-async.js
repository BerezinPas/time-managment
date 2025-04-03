import { server } from '../bff';
import { addProject } from './add-project';
import { setProject } from './set-project';

export const saveProjectAsync = (projectData) => (dispatch) => {
	return server.saveProject(projectData).then(({ res, error }) => {
		dispatch(setProject(res));
		dispatch(addProject(res));
		return res;
	});
};
