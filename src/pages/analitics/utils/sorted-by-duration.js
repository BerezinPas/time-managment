import { formateHHMMSSToTimeStamp } from '../../../utils';

export const sortedByDuration = (how = 'dec') => {
	return (a, b) => {
		return how === 'dec'
			? formateHHMMSSToTimeStamp(b.duration) -
					formateHHMMSSToTimeStamp(a.duration)
			: formateHHMMSSToTimeStamp(a.duration) -
					formateHHMMSSToTimeStamp(b.duration);
	};
};
