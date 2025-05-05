import {
	DATE_STEP,
	MOUNTH,
	ONE_WEEK_IN_MSECS,
} from '../../../../../../../constants';

export const getToolTipDate = (timeStamp, dateStep) => {
	const date = new Date(timeStamp);
	let start;
	let end;
	let endDate;
	switch (dateStep) {
		case DATE_STEP.DAY:
			return `${date.getDate()} ${MOUNTH[date.getMonth()]}`;
		case DATE_STEP.WEEK:
			endDate = new Date(timeStamp + ONE_WEEK_IN_MSECS);

			start = `${date.getDate()} ${MOUNTH[date.getMonth()]}`;

			end = `${endDate.getDate()} ${MOUNTH[endDate.getMonth()]}`;

			return `${start} - ${end}`;
		case DATE_STEP.MOUNTH:
			return `${MOUNTH[date.getMonth()]} ${date.getFullYear()}`;
		default:
			break;
	}
};
