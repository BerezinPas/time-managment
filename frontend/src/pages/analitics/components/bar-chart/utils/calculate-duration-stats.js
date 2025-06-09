import { DATE_STEP, ONE_DAY_IN_MSECS } from '../../../../../constants';

import { calculateDurationColsOnFlatGap } from './calculate-duration-cols-on-flat-gap';
import { calculateDurationColsOnMouth } from './calculate-duration-cols-on-mouth';

export const calculateDurationStats = (dateGap, tracks) => {
	const days = Math.ceil((dateGap.end - dateGap.start) / ONE_DAY_IN_MSECS);
	console.log(days);

	let stepInDays;
	let durationCols;
	let dateStep;

	if (days < 32) {
		stepInDays = 1;
		dateStep = DATE_STEP.DAY;
		durationCols = calculateDurationColsOnFlatGap(tracks, days, dateGap.start);
	} else if (days < 150) {
		const start =
			dateGap.start - new Date(dateGap.start).getUTCDay() * ONE_DAY_IN_MSECS;

		stepInDays = 7;
		dateStep = DATE_STEP.WEEK;
		durationCols = calculateDurationColsOnFlatGap(
			tracks,
			days,
			start,
			stepInDays,
		);
	} else {
		dateStep = DATE_STEP.MOUNTH;
		durationCols = calculateDurationColsOnMouth(
			tracks,
			dateGap.start,
			dateGap.end,
		);
	}

	return { durationCols, dateStep };
};
