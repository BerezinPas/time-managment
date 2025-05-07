import { URL } from '../constants';

export const setOptions = ({
	id,
	imageURL,
	userId,
	defaultStartTimeInAnalytics,
	UserId,
}) =>
	fetch(`${URL}/options/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			imageURL,
			userId,
			defaultStartTimeInAnalytics,
			UserId,
		}),
	}).then((options) => options.json());
