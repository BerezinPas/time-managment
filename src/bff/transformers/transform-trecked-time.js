export const transformTreckedTime = (DBtreckedTime) => ({
	id: DBtreckedTime.id,
	projectId: DBtreckedTime.project_id,
	startTime: DBtreckedTime.start_time,
	endTime: DBtreckedTime.end_time,
	description: DBtreckedTime.description,
});
