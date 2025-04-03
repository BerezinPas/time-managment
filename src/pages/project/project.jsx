import { useEffect, useLayoutEffect } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import { server } from '../../bff/server';
import { useDispatch, useSelector } from 'react-redux';
import { selectProject } from '../../selectors';
import { loadProjectAsync } from '../../actions';
import { ProjectForm } from './components/project-form/project-form';

export const Project = () => {
	const params = useParams();
	const isCreating = useMatch('/project');
	const dispatch = useDispatch();
	const project = useSelector(selectProject);

	useLayoutEffect(() => {
		if (isCreating) {
			return;
		}
		dispatch(loadProjectAsync(params.id));
	}, [params.id, dispatch]);

	return <div>{isCreating ? <ProjectForm /> : <div>{project.name}</div>}</div>;
};
