import { createTrack, deleteTrack, updateTrack } from '../api';
import { attachDurationToTrack } from '../utils';

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
			created: created.map(attachDurationToTrack),
			updated: updated.map(attachDurationToTrack),
			deleted: data.delete,
		},
	};
};
