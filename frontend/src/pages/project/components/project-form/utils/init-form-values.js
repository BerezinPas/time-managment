import { dateToYYYYMMDD } from '../../../../../utils';

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
			obj[`startDay-${cur.id}`] = dateToYYYYMMDD(new Date(cur.endTime));

			return obj;
		},
		{
			name: project.name || '',
		},
	);
