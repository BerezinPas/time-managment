import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProjects } from '../../selectors';
import { ProjectRow } from './components';
import { Link } from 'react-router-dom';
import { Button, LoadMore } from '../../components';
import { PAGINATION_LIMIT } from '../../constants';

export const Projects = () => {
	const projects = useSelector(selectProjects);
	const [page, setPage] = useState(1);
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
			{projects.length === 0 && <>Нет ниодного проекта</>}

			{projects
				.slice(0, PAGINATION_LIMIT * page)
				.map(({ id, name, summuryDuration }) => (
					<ProjectRow
						key={id}
						id={id}
						name={name}
						summuryDuration={summuryDuration}
					/>
				))}
			{projects.length > PAGINATION_LIMIT * page && (
				<LoadMore onClick={() => setPage((prev) => prev + 1)} />
			)}
		</div>
	);
};
