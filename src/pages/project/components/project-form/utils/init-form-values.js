export const initFormValues = (project) =>
	project.tracks.reduce(
		(obj, cur) => {
			obj[`description-${cur.id}`] = cur.description;

			obj[`startTime-${cur.id}`] = new Date(cur.startTime)
				.toLocaleTimeString()
				.slice(0, -3);

			obj[`endTime-${cur.id}`] = new Date(cur.endTime)
				.toLocaleTimeString()
				.slice(0, -3);
			obj[`startDay-${cur.id}`] = new Date(cur.endTime)
				.toISOString()
				.slice(0, 10);
			return obj;
		},
		{
			name: project.name || '',
		},
	);
