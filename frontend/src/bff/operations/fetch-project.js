import { getProject, getTracks } from '../api';
import {
	attachDurationToTrack,
	attachSummuryDurationToProject,
} from '../utils';

export const fetchProject = async (projectId) => {
	const project = await getProject(projectId);

	const tracks = await getTracks(projectId);

	const tracksWithDuration = tracks.map(attachDurationToTrack);

	const projectWithTracks = { ...project, tracks: tracksWithDuration };

	return {
		error: null,
		res: attachSummuryDurationToProject(projectWithTracks),
	};
};
