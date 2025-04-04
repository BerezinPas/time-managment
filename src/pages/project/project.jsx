import { useEffect, useLayoutEffect } from 'react';
import { Link, useMatch, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectProject } from '../../selectors';
import { deleteProjectAsync, loadProjectAsync } from '../../actions';
import { ProjectForm } from './components/project-form/project-form';
import styles from './project.module.scss';
import { Button } from '../../components';

export const Project = () => {
	const params = useParams();
	const isCreating = useMatch('/project');
	const dispatch = useDispatch();
	const project = useSelector(selectProject);

	useLayoutEffect(() => {
		if (isCreating) {
			return;
		}
		dispatch(loadProjectAsync(params.id));
	}, [params.id, dispatch]);

	const onDelete = (id) => {
		dispatch(deleteProjectAsync(id));
	};

	const projectContent = (
		<div>
			<h2>
				{project.name}
				<div className={styles.controlBtns}>
					<Button variant="delete" onClick={() => onDelete(project.id)}>
						delete
					</Button>
					<Link to={`/project/${project.id}/edit`}>
						<Button variant="secondary">edit</Button>
					</Link>
				</div>
			</h2>
		</div>
	);

	const content = isCreating ? <ProjectForm /> : projectContent;

	return <div>{content}</div>;
};
