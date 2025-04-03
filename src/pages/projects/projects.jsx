import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProjects, selectUserId } from '../../selectors';
import { loadProjectsAsync } from '../../actions';
import { ProjectRow } from './components';
import { Link } from 'react-router-dom';

export const Projects = () => {
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);
	const projects = useSelector(selectProjects);

	return (
		<div>
			<Link to="/project">add project</Link>
			{projects.map(({ id, name, summuryTreckedTime }) => (
				<ProjectRow
					key={id}
					id={id}
					name={name}
					summuryTreckedTime={summuryTreckedTime}
				/>
			))}
		</div>
	);
};
