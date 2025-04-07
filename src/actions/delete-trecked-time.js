import { ACTION_TYPE } from './action-type';

export const deleteTreckedTime = (id) => ({
	type: ACTION_TYPE.DELETE_TRECKED_TIME,
	payload: id,
});
