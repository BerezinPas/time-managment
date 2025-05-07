import { URL } from '../constants';

export const createOptions = (userId) =>
	fetch(`${URL}/options`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			userId,
			imageURL: '',
			defaultStartTimeInAnalytics: 'max',
		}),
	}).then((options) => options.json());
