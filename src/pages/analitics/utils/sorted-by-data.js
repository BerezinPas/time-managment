export const sortedByData = (how = 'dec') => {
	return (a, b) => {
		return how === 'dec'
			? Date.parse(b.startTime) - Date.parse(a.startTime)
			: Date.parse(a.startTime) - Date.parse(b.startTime);
	};
};
