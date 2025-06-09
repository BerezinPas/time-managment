export const request = (url, method, data) => {
	return fetch(`/api${url}`, {
		headers: {
			'content-Type': 'application/json',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
	}).then((res) => {
		console.log(res);
		if (res.status === 500) {
			return { res: null, error: 'Сервер не отвечает' };
		}
		if (res.ok) {
			return res.json();
		}
		return { res: null, error: 'Что-то пошло не так' };
	});
	// .catch((e) => {
	// 	console.log(e);

	// 	return { error: 'Что-то пошло не так' };
	// });
};
