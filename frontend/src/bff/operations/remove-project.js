import { deleteProject, deleteTrack } from '../api';

export const removeProject = async (projectId, tracksId) => {
	await deleteProject(projectId);
	await Promise.all(tracksId.map((id) => deleteTrack(id)));

	return {
		error: null,
		res: true,
	};
};
