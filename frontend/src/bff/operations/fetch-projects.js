import { getProjects, getTracks } from '../api';
import {
	attachDurationToTrack,
	attachSummuryDurationToProject,
	attachTracksToProjects,
} from '../utils';

export const fetchProjects = async (userId) => {
	// console.log('fetchProjects', userId);
	// console.log(allTracks, 'allTracks');
	// console.log(projects, 'projects');

	const projects = await getProjects(userId);
	const allTracks = await getTracks();

	const tracksWithDuration = allTracks.map(attachDurationToTrack);

	const projectWithTracks = attachTracksToProjects(
		projects,
		tracksWithDuration,
	);

	const projectWithTracksAndSumDuration = projectWithTracks.map(
		attachSummuryDurationToProject,
	);

	return {
		error: null,
		res: projectWithTracksAndSumDuration,
	};
};
