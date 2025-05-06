import { formateTimeStampToHHMMSS } from '../../utils';
import { calcSumDuration } from './calc-sum-duration';

export const attachSummuryDurationToProjects = (projects) =>
	projects.map((project) => ({
		...project,
		summuryDuration: formateTimeStampToHHMMSS(calcSumDuration(project.tracks)),
	}));
