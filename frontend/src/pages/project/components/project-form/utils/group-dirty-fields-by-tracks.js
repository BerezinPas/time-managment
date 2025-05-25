export const groupDirtyFieldsByTracks = (dirtyFields, formData, projectId) =>
	Object.keys(dirtyFields).reduce((acc, cur) => {
		const [key, id] = cur.split('-');
		if (key === 'name' || id.includes('generated')) {
			return acc;
		}
		const existedItem = acc[acc.findIndex((el) => el.id === id)];
		if (existedItem) {
			existedItem[key] = formData[cur];
			return acc;
		}
		return [...acc, { id: id, [key]: formData[cur], projectId }];
	}, []);
