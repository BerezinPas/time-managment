import { getProjects, getTracks } from '../api';
import {
	attachDurationToTrack,
	attachSummuryDurationToProjects,
	attachTracksToProjects,
} from '../utils';

export const fetchProjects = async (userId) => {
	// console.log('fetchProjects', userId);
	// console.log(allTracks, 'allTracks');
	// console.log(projects, 'projects');

	const projects = await getProjects(userId);
	const allTracks = await getTracks();

	const tracksWithDuration = allTracks.map(attachDurationToTrack);

	let res = attachTracksToProjects(projects, tracksWithDuration);
	// console.log(res);

	res = attachSummuryDurationToProjects(res);

	// console.log(res);

	return {
		error: null,
		res,
	};
};
