import {
	formateHHMMSSToTimeStamp,
	formateTimeStampToHHMMSS,
} from '../../../utils';

export const attachDurationToProject = (project) => ({
	...project,
	duration: formateTimeStampToHHMMSS(
		project.tracks.reduce((totalDurTracks, curTrack) => {
			return formateHHMMSSToTimeStamp(curTrack.duration) + totalDurTracks;
		}, 0),
	),
});
