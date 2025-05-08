import { getOptions } from '../api';

export const fetchOptions = async (userId) => {
	const options = await getOptions(userId);

	console.log('fetchOptions soptions', options);

	return {
		error: null,
		res: options,
	};
};
