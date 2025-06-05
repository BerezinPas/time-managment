// export const request = (url, method, data, isFile) => {
// 	return fetch(`/api${url}`, {
// 		headers: {
// 			'content-Type': isFile ? 'multipart/form-data' : 'application/json',
// 		},
// 		method: method || 'GET',
// 		body: data ? JSON.stringify(data) : undefined,
// 	}).then((res) => res.json());
// };

export const request = (url, method, data, isFile = false) => {
	if (isFile) {
		const formData = new FormData();
		for (const key in data) {
			if (key === 'imageFile') {
				formData.append(key, data[key], data[key].name);
			} else {
				formData.append(key, data[key]);
			}
		}

		return fetch(`/api${url}`, {
			method: method || 'POST',
			body: formData,
			// Не устанавливаем Content-Type вручную, браузер сделает это сам с правильным boundary
		}).then((res) => res.json());
	} else {
		return fetch(`/api${url}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: method || 'GET',
			body: data ? JSON.stringify(data) : undefined,
		}).then((res) => res.json());
	}
};
