import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProjects, selectUserId } from '../../selectors';
import { loadProjectsAsync } from '../../actions';
import { ProjectRow } from './components';
import { Link } from 'react-router-dom';
import { Button } from '../../components';

export const Projects = () => {
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);
	const projects = useSelector(selectProjects);

	return (
		<div className="container">
			<div>
				<h2 className="h2">
					Проекты
					<Link to="/project">
						<Button>создать проект</Button>
					</Link>
				</h2>
			</div>

			{projects.map(({ id, name, summuryDuration }) => (
				<ProjectRow
					key={id}
					id={id}
					name={name}
					summuryDuration={summuryDuration}
				/>
			))}
		</div>
	);
};
