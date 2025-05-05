import { createTrack, deleteTrack, updateTrack } from '../api';

export const saveTracks = async (data) => {
	console.log('saveTracks', data);

	const created = await Promise.all(
		data.create.map((treckedTime) => createTrack(treckedTime)),
	);

	const updated = await Promise.all(
		data.update.map((treckedTime) => updateTrack(treckedTime)),
	);

	await Promise.all(data.delete.map((id) => deleteTrack(id)));

	return {
		error: null,
		res: {
			created,
			updated,
			deleted: data.delete,
		},
	};
};
