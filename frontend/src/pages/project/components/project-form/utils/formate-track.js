import { ONE_DAY_IN_MSECS } from '../../../../../constants';

export const formateTrack = (track, fields) => {
	// console.log('track', track);
	// console.log('fields', fields);

	if (
		track.startTime === undefined &&
		track.endTime === undefined &&
		track.startDay === undefined
	) {
		return track;
	}
	const {
		startDay = fields.startDay,
		startTime = fields.startTime,
		endTime = fields.endTime,
	} = track;

	// let startDay = track.startDay ? track.startDay : fields.startDay;
	const startDate = new Date(`${startDay}T${startTime}`);
	const endDate = new Date(`${startDay}T${endTime}`);

	const correctEndDate =
		startDate > endDate
			? new Date(endDate.getTime() + ONE_DAY_IN_MSECS)
			: endDate;

	return {
		...track,
		endTime: correctEndDate.toISOString(),
		startTime: startDate.toISOString(),
	};
};
