import { Link } from 'react-router-dom';

export const ProjectRow = ({ id, name, summuryTreckedTime }) => {
	return (
		<Link to={`/project/${id}`} className="row hover">
			<div>{name}</div>
			<div>{summuryTreckedTime}</div>
		</Link>
	);
};
