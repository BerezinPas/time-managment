import { createTrack } from '../api';

export const addTrack = async (trackData) => {
	const track = await createTrack(trackData);

	return {
		error: null,
		res: track,
	};
};
