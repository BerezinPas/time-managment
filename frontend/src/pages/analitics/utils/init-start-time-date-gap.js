import { OPTIONS_START_TIME_DEFAULT_VALUE } from '../../../constants';

export const initDateGapStartTime = (projects, id, option) => {
	const curDate = new Date();
	const date = new Date();
	date.setHours(0, 0, 0, 0);

	switch (option) {
		case OPTIONS_START_TIME_DEFAULT_VALUE.MAX: {
			const filtredProjects = projects.filter((project) =>
				id === undefined ? project : project.id === id,
			);
			if (!filtredProjects.some((project) => project?.tracks.length !== 0)) {
				return date.setHours(0, 0, 0, 0);
			}
			return new Date(
				filtredProjects.reduce((min, curProject) => {
					return curProject.startTime < min.startTime ? curProject : min;
				}).startTime,
			).setHours(0, 0, 0, 0);
		}

		case OPTIONS_START_TIME_DEFAULT_VALUE.WEEK: {
			const weekDayNumber = curDate.getUTCDay() === 0 ? 7 : curDate.getUTCDay();
			return date.setDate(curDate.getDate() - weekDayNumber);
		}

		case OPTIONS_START_TIME_DEFAULT_VALUE.MOUNTH:
			return date.setDate(1);

		case OPTIONS_START_TIME_DEFAULT_VALUE.YEAR:
			return date.setMonth(0, 1);

		default:
			return date.setHours(0, 0, 0, 0);
	}
};
