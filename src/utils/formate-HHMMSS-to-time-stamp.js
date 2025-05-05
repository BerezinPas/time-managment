export const formateHHMMSSToTimeStamp = (date) => {
	let [hours, min, secs] = date.split(':').map(Number);
	return (hours * 3600 + min * 60 + secs) * 1000;
};
