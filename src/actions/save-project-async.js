import { server } from '../bff';
import { addProject } from './add-project';
import { createTreckedTime } from './create-trecked-time';
import { deleteTreckedTime } from './delete-trecked-time';
import { setProject } from './set-project';
import { updateTreckedTime } from './update-trecked-time';

export const saveProjectAsync = (projectData) => (dispatch) => {
	return server.saveProject(projectData).then(({ res, error }) => {
		if (projectData.id === null) {
			dispatch(addProject(res.project));
		}

		res.trecksData.res.created.map((el) => dispatch(createTreckedTime(el)));
		res.trecksData.res.updated.map((el) => dispatch(updateTreckedTime(el)));
		res.trecksData.res.deleted.map((el) => dispatch(deleteTreckedTime(el)));
		dispatch(setProject(res.project));
		return res;
	});
};
