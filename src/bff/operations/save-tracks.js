import { createTrack, deleteTrack, updateTrack } from '../api';
import { attachDurationToTrack } from '../utils';

export const saveTracks = async (tracks, projectId) => {
	console.log('saveTracks', tracks);

	const created = await Promise.all(
		tracks.create.map((treckedTime) => createTrack(treckedTime)),
	);

	const updated = await Promise.all(
		tracks.update.map((treckedTime) => updateTrack(treckedTime)),
	);

	await Promise.all(tracks.delete.map((id) => deleteTrack(id)));

	const deleted = tracks.delete.map((id) => ({ projectId, id }));

	return {
		error: null,
		res: {
			created: created.map(attachDurationToTrack),
			updated: updated.map(attachDurationToTrack),
			deleted,
		},
	};
};
