import { useEffect, useState } from 'react';
import { server } from '../../bff/server';
import { useDispatch, useSelector } from 'react-redux';
import { selectProjects, selectUserId } from '../../selectors';
import { loadProjectsAsync } from '../../actions';
import { Project } from './components';

export const Projects = () => {
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);
	const projects = useSelector(selectProjects);

	useEffect(() => {
		dispatch(loadProjectsAsync(userId));
	}, [userId, dispatch]);

	return (
		<div>
			{projects.map(({ id, name, summuryTreckedTime }) => (
				<Project
					key={id}
					id={id}
					name={name}
					summuryTreckedTime={summuryTreckedTime}
				/>
			))}
		</div>
	);
};
