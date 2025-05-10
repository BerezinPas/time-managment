import { Link } from 'react-router-dom';

export const ProjectRow = ({ id, name, summuryDuration }) => {
	return (
		<Link to={`/project/${id}`} className="row hover">
			<div>{name}</div>
			<div style={{ marginLeft: 'auto', width: '80px' }}>{summuryDuration}</div>
		</Link>
	);
};
