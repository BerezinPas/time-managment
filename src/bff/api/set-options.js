import { URL } from '../constants';
import { transformOptions } from '../transformers';

export const setOptions = ({
	id,
	imageURL,
	userId,
	defaultStartTimeInAnalytics,
}) =>
	fetch(`${URL}/options/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			image_url: imageURL,
			user_id: userId,
			default_start_time_in_analytics: defaultStartTimeInAnalytics,
		}),
	})
		.then((options) => options.json())
		.then((options) => transformOptions(options));
