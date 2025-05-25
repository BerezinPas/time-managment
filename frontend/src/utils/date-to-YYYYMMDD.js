export const dateToYYYYMMDD = (date = new Date()) => {
	const mounth = `0${date.getMonth() + 1}`.slice(-2);
	const day = `0${date.getDate()}`.slice(-2);
	const year = `000${date.getFullYear()}`.slice(-4);

	return `${year}-${mounth}-${day}`;
};
