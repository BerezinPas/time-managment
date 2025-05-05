import { createProject, updateProject } from '../api';
import { saveTracks } from './save-tracks';

export const saveProject = async ({ id, name, userId, tracks }) => {
	let tracksData;
	let project;

	if (id !== null) {
		project = await updateProject(id, name);
		tracksData = await saveTracks(tracks);
	} else {
		project = await createProject(name, userId);
		tracksData = await saveTracks({
			...tracks,
			create: tracks.create.map((track) => ({
				...track,
				projectId: project.id,
			})),
		});
	}

	return {
		error: null,
		res: { project, tracksData },
	};
};
