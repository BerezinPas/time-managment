import { URL } from '../constants';
import { transformProject } from '../transformers';

export const getProjects = (userId) =>
	fetch(`${URL}/projects?user_id=${userId}`)
		.then((projects) => projects.json())
		.then((projects) => projects && projects.map(transformProject));
