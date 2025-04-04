import { ACTION_TYPE } from './action-type';

export const createTreckedTime = (treckedTime) => ({
	type: ACTION_TYPE.CREATE_TRECKED_TIME,
	payload: treckedTime,
});
