export const formateTimeStampToHHMMSS = (timeStamp) => {
	const secs = Math.floor(timeStamp / 1000);
	const pad = (val, index) => (index === 0 ? val : ('0' + val).slice(-2));
	return [Math.floor(secs / 3600), Math.floor((secs % 3600) / 60), secs % 60]
		.map(pad)
		.join(':');
};
