import { ACTION_TYPE } from './action-type';

export const createTrack = (track) => ({
	type: ACTION_TYPE.CREATE_TRACK,
	payload: track,
});
