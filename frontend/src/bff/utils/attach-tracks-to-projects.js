export const attachTracksToProjects = (projects, tracks) => {
	const trackMap = tracks.reduce((acc, curTrack) => {
		if (acc[curTrack.projectId]) {
			acc[curTrack.projectId].push(curTrack);
		} else {
			acc[curTrack.projectId] = [curTrack];
		}
		return acc;
	}, []);

	return projects.map((project) => ({
		...project,
		tracks: trackMap[project.id] || [],
	}));
};
