import { createTreckedTime } from '../api';

export const addTreckedTime = async (treckedTimeData) => {
	const treckedTime = await createTreckedTime(treckedTimeData);
	console.log('createTreckedTime', treckedTime);

	return {
		error: null,
		res: treckedTime,
	};
};
