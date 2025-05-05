export const transformTrack = (DBtrack) => ({
	id: DBtrack.id,
	projectId: DBtrack.project_id,
	startTime: DBtrack.start_time,
	endTime: DBtrack.end_time,
	description: DBtrack.description,
});
