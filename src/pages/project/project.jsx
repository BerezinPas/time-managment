import { useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { server } from '../../bff/server';
import { useDispatch, useSelector } from 'react-redux';
import { selectProject } from '../../selectors';
import { loadProjectAsync } from '../../actions';

export const Project = () => {
	const params = useParams('/project');
	const dispatch = useDispatch();
	const project = useSelector(selectProject);

	useLayoutEffect(() => {
		dispatch(loadProjectAsync(params.id));
	}, [params.id, dispatch]);

	return (
		<div>
			<div>{project.name}</div>
		</div>
	);
};
