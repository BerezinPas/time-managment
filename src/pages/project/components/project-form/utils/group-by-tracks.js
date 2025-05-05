export const groupByTracks = (formData, projectId) =>
	Object.keys(formData).reduce((acc, cur) => {
		const [key, id] = cur.split('-');
		if (key === 'name') {
			return acc;
		}
		const existedItem = acc[acc.findIndex((el) => el.id === id)];
		if (existedItem) {
			existedItem[key] = formData[cur];
			return acc;
		}
		return [...acc, { id: id, [key]: formData[cur], projectId }];
	}, []);
