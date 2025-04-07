import { createProject, updateProject } from '../api';
import { saveTreckedTimes } from './save-trecked-times';

export const saveProject = async ({ id, name, userId, treckedTimes }) => {
	let trecksData;
	let project;

	if (id !== null) {
		project = await updateProject(id, name);
		trecksData = await saveTreckedTimes(treckedTimes);
	} else {
		project = await createProject(name, userId);
		trecksData = await saveTreckedTimes({
			...treckedTimes,
			create: treckedTimes.create.map((treck) => ({
				...treck,
				projectId: project.id,
			})),
		});
	}

	return {
		error: null,
		res: { project, trecksData },
	};
};
