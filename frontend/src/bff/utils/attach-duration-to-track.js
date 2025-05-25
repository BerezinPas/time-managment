import { formateTimeStampToHHMMSS } from '../../utils';

export const attachDurationToTrack = (track) => {
	const duration = formateTimeStampToHHMMSS(
		Date.parse(track.endTime) - Date.parse(track.startTime),
	);

	return {
		...track,
		duration,
	};
};
