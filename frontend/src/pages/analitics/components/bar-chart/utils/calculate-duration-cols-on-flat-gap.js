import { ONE_DAY_IN_MSECS, ONE_HOUR_IN_MSECS } from '../../../../../constants';
import { updateDurationCols } from './update-duration-cols';

export const calculateDurationColsOnFlatGap = (
	tracks,
	days,
	startDate,

	stepInDays = 1,
) => {
	return tracks.reduce(
		(acc, curTrack) => {
			const index = Math.floor(
				(Date.parse(curTrack.startTime) - startDate) /
					(ONE_DAY_IN_MSECS * stepInDays),
			);
			return updateDurationCols(acc, index, curTrack.duration);
		},
		new Array(Math.ceil(days / stepInDays)).fill('0:00:00'),
	);
};
