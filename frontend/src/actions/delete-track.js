import { ACTION_TYPE } from './action-type';

export const deleteTrack = (id) => ({
	type: ACTION_TYPE.DELETE_TRACK,
	payload: id,
});
