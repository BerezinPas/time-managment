import { formateHHMMSSToTimeStamp } from '../../../utils';

export const attachPercentOfTotal = (el, key, total) => ({
	...el,
	percentageOfTotal: (formateHHMMSSToTimeStamp(el[key]) / total) * 100,
});
