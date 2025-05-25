import { URL } from '../constants';
import { transformOptions } from '../transformers';

export const createOptions = (userId) =>
	fetch(`${URL}/options`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			user_id: userId,
			image_url: '',
			default_start_time_in_analytics: 'MAX',
		}),
	})
		.then((options) => options.json())
		.then((options) => transformOptions(options));
