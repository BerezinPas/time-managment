export const calcSumDuration = (arr = []) =>
	arr.reduce((sum, curTrack) => {
		return sum + Date.parse(curTrack.endTime) - Date.parse(curTrack.startTime);
	}, 0);
