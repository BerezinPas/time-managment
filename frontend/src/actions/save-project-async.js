import { request } from '../utils';
import { addProject } from './add-project';
import { createTrack } from './create-track';
import { deleteTrack } from './delete-track';
import { setProject } from './set-project';
import { updateTrack } from './update-track';

export const saveProjectAsync = (projectData) => (dispatch) => {
	const saveRequest =
		projectData.id === null
			? request('/projects', 'POST', projectData)
			: request(`/projects/${projectData.id}`, 'PATCH', projectData);
	return saveRequest.then(({ res, error }) => {
		if (error) {
			console.log('error', error);
			return { error };
		}
		if (projectData.id === null) {
			dispatch(addProject(res.project));
		}

		console.log('res', res);
		// console.log('saveProjectAsync', res.project);

		res.tracksData.created.map((el) => dispatch(createTrack(el)));
		res.tracksData.updated.map((el) => dispatch(updateTrack(el)));
		res.tracksData.deleted.map((el) => dispatch(deleteTrack(el)));

		dispatch(setProject(res.project));

		return { res: res.project, error };
	});
};
