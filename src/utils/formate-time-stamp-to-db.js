export const formateTimeStampToDb = (timeStamp) =>
	new Date(timeStamp).toUTCString();
