import { Link } from 'react-router-dom';

export const ProjectRow = ({ id, name, summuryTreckedTime }) => {
	return (
		<Link to={`/project/${id}`}>
			<div>{id}</div>
			<div>{name}</div>
			<div>{summuryTreckedTime}</div>
		</Link>
	);
};
