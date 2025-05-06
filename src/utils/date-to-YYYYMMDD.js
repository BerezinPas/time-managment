export const dateToYYYYMMDD = (date = new Date()) => {
	const mounth = `0${date.getMonth() + 1}`.slice(-2);
	const day = `0${date.getDate()}`.slice(-2);
	console.log(`${date.getFullYear()}-${day}-${mounth}`);

	return `${date.getFullYear()}-${mounth}-${day}`;
};
