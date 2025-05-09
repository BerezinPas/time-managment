import { createTrack } from '../api';
import { attachDurationToTrack } from '../utils';

export const addTrack = async (trackData) => {
	const track = await createTrack(trackData);

	return {
		error: null,
		res: attachDurationToTrack(track),
	};
};
