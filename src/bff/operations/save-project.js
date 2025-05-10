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
		project = { ...project, tracks: [] };

		tracksData = await saveTracks({
			...tracks,
			create: tracks.create.map((track) => ({
				...track,
				projectId: project.id,
			})),
		});
	}

	console.log('PROJECT SAVE PROJCEC', project);

	return {
		error: null,
		res: { project, tracksData },
	};
};
