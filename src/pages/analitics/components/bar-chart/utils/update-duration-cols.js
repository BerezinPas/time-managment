import {
	formateHHMMSSToTimeStamp,
	formateTimeStampToHHMMSS,
} from '../../../../../utils';

export const updateDurationCols = (durationsCols, index, duration) => {
	if (durationsCols[index]) {
		durationsCols[index] = formateTimeStampToHHMMSS(
			formateHHMMSSToTimeStamp(durationsCols[index]) +
				formateHHMMSSToTimeStamp(duration),
		);
	} else {
		durationsCols[index] = duration;
	}
	return durationsCols;
};
