import { OPTIONS_START_TIME_DEFAULT_VALUE } from '../../../constants';

export const initDateGapStartTime = (projects, id, option) => {
	const curDate = new Date();
	const date = new Date();
	date.setHours(0, 0, 0, 0);
	switch (option) {
		case OPTIONS_START_TIME_DEFAULT_VALUE.MAX:
			return new Date(
				projects
					.filter((project) =>
						id === undefined ? project : project.id === Number(id),
					)
					.reduce(
						(accStart, curProject) => {
							const curStart = curProject.tracks.reduce(
								(minStartTimeTrack, curTrack) => {
									return minStartTimeTrack > Date.parse(curTrack.startTime)
										? Date.parse(curTrack.startTime)
										: minStartTimeTrack;
								},
								new Date().setHours(0, 0, 0, 0),
							);
							return curStart < accStart ? curStart : accStart;
						},
						new Date().setHours(0, 0, 0, 0),
					),
			).setHours(0, 0, 0, 0);

		case OPTIONS_START_TIME_DEFAULT_VALUE.WEEK:
			return date.setDate(curDate.getDate() - curDate.getDay() + 1);

		case OPTIONS_START_TIME_DEFAULT_VALUE.MOUNTH:
			return date.setDate(1);

		case OPTIONS_START_TIME_DEFAULT_VALUE.YEAR:
			return date.setMonth(0, 1);

		default:
			return date;
	}
};
