import { Link } from 'react-router-dom';

export const ProjectRow = ({ id, name, summuryDuration }) => {
	return (
		<Link to={`/project/${id}`} className="row hover">
			<div>{name}</div>
			<div>{summuryDuration}</div>
		</Link>
	);
};
