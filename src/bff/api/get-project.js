import { URL } from '../constants';
import { transformProject } from '../transformers';

export const getProject = (projectId) =>
	fetch(`${URL}/projects/${projectId}`)
		.then((project) => project.json())
		.then((project) => project && transformProject(project));
