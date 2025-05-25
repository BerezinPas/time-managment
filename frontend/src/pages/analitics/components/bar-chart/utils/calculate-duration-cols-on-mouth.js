import { ONE_DAY_IN_MSECS, ONE_HOUR_IN_MSECS } from '../../../../../constants';
import { updateDurationCols } from './update-duration-cols';

export const calculateDurationColsOnMouth = (
	tracks,
	startTime,
	endTime,
	timeZone,
) => {
	const startDate = new Date(startTime);
	const endDate = new Date(endTime + ONE_DAY_IN_MSECS - 1);
	const startMounth = startDate.getMonth();
	const startYear = startDate.getFullYear();

	const mouthsQuantity =
		1 +
		endDate.getMonth() -
		startMounth +
		(endDate.getFullYear() - startDate.getFullYear()) * 12;
	console.log('mouthsQuantity', mouthsQuantity);

	console.log('endDate', new Date(endDate));
	console.log('start', new Date(startTime));

	return tracks.reduce((acc, curTrack) => {
		const trackDate = new Date(
			Date.parse(curTrack.startTime) - timeZone * ONE_HOUR_IN_MSECS,
		);

		const index =
			trackDate.getMonth() -
			startMounth +
			(trackDate.getFullYear() - startYear) * 12;

		return updateDurationCols(acc, index, curTrack.duration);
	}, new Array(mouthsQuantity).fill('0:00:00'));
};
