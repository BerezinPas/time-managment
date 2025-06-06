import {
	DATE_STEP,
	MOUNTH,
	ONE_DAY_IN_MSECS,
	ONE_WEEK_IN_MSECS,
} from '../../../../../../../constants';

export const getColDate = (date, dateStep, isAbbreviated, isFirst, dateEnd) => {
	let year, mouth, start, end, startDate, endDate;
	startDate = new Date(date);
	switch (dateStep) {
		case DATE_STEP.DAY:
			return isAbbreviated
				? `${new Date(date).getDate()}.${new Date(date).getMonth() + 1}`
				: `${startDate.getDate()} ${MOUNTH[startDate.getMonth()]}`;

		case DATE_STEP.WEEK:
			if (isFirst) {
				endDate = new Date(
					date -
						startDate.getUTCDay() * ONE_DAY_IN_MSECS +
						ONE_WEEK_IN_MSECS -
						1,
				);
			} else if (dateEnd) {
				endDate = new Date(dateEnd);
			} else {
				endDate = new Date(date + ONE_WEEK_IN_MSECS - 1);
			}

			start = isAbbreviated
				? `${startDate.getDate()}.${startDate.getMonth() + 1}`
				: `${startDate.getDate()} ${MOUNTH[startDate.getMonth()]}`;

			end = isAbbreviated
				? `${endDate.getDate()}.${endDate.getMonth() + 1}`
				: `${endDate.getDate()} ${MOUNTH[endDate.getMonth()]}`;

			return `${start} - ${end}`;

		case DATE_STEP.MOUNTH:
		default:
			year = new Date(date).getFullYear();

			mouth = new Date(date).getMonth() + 1;

			return isAbbreviated
				? `${mouth}.${year}`
				: `${MOUNTH[date.getMonth()]} ${startDate.getFullYear()}`;
	}
};
