import {
	DATE_STEP,
	ONE_DAY_IN_MSECS,
	ONE_WEEK_IN_MSECS,
} from '../../../../../../../constants';

export const getDate = (dateStep, dateGap, step) => {
	let mounth, year, date;
	switch (dateStep) {
		case DATE_STEP.MOUNTH:
			mounth = new Date(dateGap.start).getMonth() + step;
			year = Math.floor(mounth / 12);
			date = new Date(dateGap.start);
			date.setMonth(mounth % 12);
			date.setFullYear(date.getFullYear() + year);
			return date;

		case DATE_STEP.WEEK:
			return dateGap.start + step * ONE_WEEK_IN_MSECS;

		case DATE_STEP.DAY:
		default:
			return dateGap.start + step * ONE_DAY_IN_MSECS;
	}
};
