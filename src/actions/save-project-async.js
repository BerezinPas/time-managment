import { server } from '../bff';
import { addProject } from './add-project';
import { createTrack } from './create-track';
import { deleteTrack } from './delete-track';
import { setProject } from './set-project';
import { updateTrack } from './update-track';

export const saveProjectAsync = (projectData) => (dispatch) => {
	return server.saveProject(projectData).then(({ res, error }) => {
		if (projectData.id === null) {
			dispatch(addProject(res.project));
		}

		res.tracksData.res.created.map((el) => dispatch(createTrack(el)));
		res.tracksData.res.updated.map((el) => dispatch(updateTrack(el)));
		res.tracksData.res.deleted.map((el) => dispatch(deleteTrack(el)));
		dispatch(setProject(res.project));
		return res;
	});
};
