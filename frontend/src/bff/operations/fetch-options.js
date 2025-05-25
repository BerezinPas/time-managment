import { getOptions } from '../api';

export const fetchOptions = async (userId) => {
	const options = await getOptions(userId);

	return {
		error: null,
		res: options,
	};
};
