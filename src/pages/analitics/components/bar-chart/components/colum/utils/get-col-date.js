import { DATE_STEP, ONE_WEEK_IN_MSECS } from '../../../../../../../constants';

export const getColDate = (date, dateStep) => {
	let year, mouth, start, end, startDate, endDate;

	switch (dateStep) {
		case DATE_STEP.DAY:
			return `${new Date(date).getDate()}.${new Date(date).getMonth() + 1}`;

		case DATE_STEP.WEEK:
			startDate = new Date(date);
			start = `${startDate.getDate()}.${startDate.getMonth() + 1}`;

			endDate = new Date(date + ONE_WEEK_IN_MSECS);
			end = `${endDate.getDate()}.${endDate.getMonth() + 1}`;

			return `${start} - ${end}`;

		case DATE_STEP.MOUNTH:
		default:
			year = new Date(date).getFullYear();

			mouth = new Date(date).getMonth() + 1;

			return `${mouth}.${year}`;
	}
};
