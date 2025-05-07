import { URL } from '../constants';

export const getOptions = (login) =>
	fetch(`${URL}/options?userId=${login}`)
		.then((options) => options.json())
		.then(([options]) => options);
