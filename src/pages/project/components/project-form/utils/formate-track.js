import { ONE_DAY_IN_MSECS } from '../../../../../constants';

export const formateTrack = (track, fields) => {
	if (
		track.startTime === undefined &&
		track.endTime === undefined &&
		track.startDay === undefined
	) {
		return track;
	}
	let startDay = track.startDay ? track.startDay : fields.startDay;
	let newStartTime = new Date(
		`${startDay}T${track.startTime || fields.startTime}`,
	);
	let newEndTime = new Date(`${startDay}T${track.endTime || fields.endTime}`);

	if (newStartTime > newEndTime) {
		newEndTime = Date.parse(newEndTime) + ONE_DAY_IN_MSECS;

		return {
			...track,
			endTime: new Date(newEndTime).toISOString(),
			startTime: newStartTime.toISOString(),
		};
	}

	return {
		...track,
		endTime: newEndTime.toISOString(),
		startTime: newStartTime.toISOString(),
	};
};
