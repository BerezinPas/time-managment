import { formateTimeStampToHHMMSS } from '../../utils';
import { calcSumDuration } from './calc-sum-duration';

export const attachSummuryDurationToProject = (project) => ({
	...project,
	summuryDuration: formateTimeStampToHHMMSS(calcSumDuration(project.tracks)),
});
