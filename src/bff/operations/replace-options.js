import { setOptions } from '../api';

export const replaceOptions = async (optionData) => {
	const options = await setOptions(optionData);

	return {
		error: null,
		res: options,
	};
};
