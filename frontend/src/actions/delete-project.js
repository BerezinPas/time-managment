import { ACTION_TYPE } from './action-type';

export const deleteProject = (id) => ({
	type: ACTION_TYPE.DELETE_PROJECT,
	payload: id,
});
