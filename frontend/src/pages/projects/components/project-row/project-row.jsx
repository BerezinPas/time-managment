import { Link } from 'react-router-dom';

export const ProjectRow = ({ id, name, sumDuration }) => {
	return (
		<Link to={`/project/${id}`} className="row hover">
			<div>{name}</div>
			<div style={{ marginLeft: 'auto', width: '80px' }}>{sumDuration}</div>
		</Link>
	);
};
