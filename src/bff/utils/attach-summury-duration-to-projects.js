import { formateTimeStampToHHMMSS } from '../../utils';

export const attachSummuryDurationToProjects = (projects) =>
	projects.map((project) => ({
		...project,
		summuryDuration: formateTimeStampToHHMMSS(
			project.tracks.reduce((sum, curTrack) => {
				return (
					sum + Date.parse(curTrack.endTime) - Date.parse(curTrack.startTime)
				);
			}, 0),
		),
	}));
