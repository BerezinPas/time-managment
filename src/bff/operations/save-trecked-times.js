import {
	createTreckedTime,
	deleteTreckedTime,
	updateTreckedTime,
} from '../api';

export const saveTreckedTimes = async (data) => {
	console.log('saveTreckedTimes', data);

	const created = await Promise.all(
		data.create.map((treckedTime) => createTreckedTime(treckedTime)),
	);

	const updated = await Promise.all(
		data.update.map((treckedTime) => updateTreckedTime(treckedTime)),
	);

	await Promise.all(data.delete.map((id) => deleteTreckedTime(id)));

	return {
		error: null,
		res: {
			created,
			updated,
			deleted: data.delete,
		},
	};
};
