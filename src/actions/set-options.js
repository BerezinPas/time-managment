import { ACTION_TYPE } from './action-type';

export const setOptions = (options) => ({
	type: ACTION_TYPE.SET_OPTIONS,
	payload: options,
});
