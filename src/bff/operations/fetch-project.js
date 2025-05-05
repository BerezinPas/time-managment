import { getProject, getTracks } from '../api';
import {
	attachDurationToTrack,
	attachSummuryDurationToProjects,
} from '../utils';

export const fetchProject = async (projectId) => {
	const project = await getProject(projectId);

	const tracks = await getTracks(projectId);

	const tracksWithDuration = tracks.map(attachDurationToTrack);

	// let res = attachTracksToProjects(projects, tracksWithDuration);

	// TODO добавить суммарную длительность
	// attachSummuryDurationToProjects();
	return {
		error: null,
		res: { ...project, tracks },
	};
};
