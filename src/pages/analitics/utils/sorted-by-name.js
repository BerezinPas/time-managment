export const sortedByName = (how = 'dec') => {
	return (a, b) => {
		let key = a.name === undefined ? 'description' : 'name';

		let i = 0;
		const num = how === 'dec' ? 1 : -1;
		while (a[key].length > i || b[key].length > i) {
			if (a[key].toLowerCase() > b[key].toLowerCase()) {
				return num;
			}
			if (a[key].toLowerCase() < b[key].toLowerCase()) {
				return -1 * num;
			}
			i++;
		}
		if (a[key].length === b[key].length) {
			return 0;
		}
		return a[key].length > b[key].length ? num : -1 * num;
	};
};
