export const transformProject = (DBproject) => ({
	id: DBproject.id,
	userId: DBproject.user_id,
	name: DBproject.name,
	treckedTimes: {
		id: DBproject.trecked_times.id,
		startTime: DBproject.trecked_times.start_time,
		endTime: DBproject.trecked_times.end_time,
		description: DBproject.trecked_times.description,
	},
});
