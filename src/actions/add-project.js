import { ACTION_TYPE } from './action-type';

export const addProject = (project) => ({
	type: ACTION_TYPE.ADD_PROJECT,
	payload: project,
});
