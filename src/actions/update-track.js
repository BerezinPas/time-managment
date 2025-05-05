import { ACTION_TYPE } from './action-type';

export const updateTrack = (track) => ({
	type: ACTION_TYPE.UPDATE_TRACK,
	payload: track,
});
