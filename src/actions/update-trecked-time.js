import { ACTION_TYPE } from './action-type';

export const updateTreckedTime = (treckedTime) => ({
	type: ACTION_TYPE.UPDATE_TRECKED_TIME,
	payload: treckedTime,
});
