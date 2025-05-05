import { URL } from '../constants';
import { transformProject } from '../transformers';

export const updateProject = (id, name) =>
	fetch(`${URL}/projects/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			name,
		}),
	})
		.then((project) => project.json())
		.then((project) => project && transformProject(project));
