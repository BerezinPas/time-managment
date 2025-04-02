import { ACTION_TYPE } from './action-type';

export const setProject = (project) => ({
	type: ACTION_TYPE.SET_PROJECT,
	payload: project,
});
