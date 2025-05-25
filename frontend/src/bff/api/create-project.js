import { URL } from '../constants';
import { transformProject } from '../transformers';

export const createProject = (name, userId) =>
	fetch(`${URL}/projects`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			user_id: userId,
			name,
		}),
	})
		.then((project) => project.json())
		.then((project) => project && transformProject(project));
