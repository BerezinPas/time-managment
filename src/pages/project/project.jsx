import { useEffect, useLayoutEffect } from 'react';
import { Link, useMatch, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectProject, selectTreckedTimes } from '../../selectors';
import { deleteProjectAsync, loadProjectAsync } from '../../actions';
import { ProjectForm } from './components/project-form/project-form';
import { Button } from '../../components';
import { TreckedTimeRow } from './components';
import styles from './project.module.scss';

export const Project = () => {
	const params = useParams();
	const isCreating = useMatch('/project');
	const dispatch = useDispatch();
	const project = useSelector(selectProject);
	const treckedTimes = useSelector(selectTreckedTimes);

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
		<div className="container">
			<h2 className="h2">
				{project.name}
				<div className={styles.controlBtns}>
					<Link to={`/project/${project.id}/edit`}>
						<Button>редактировать</Button>
					</Link>
					<Button variant="danger" onClick={() => onDelete(project.id)}>
						удалить
					</Button>
				</div>
			</h2>
			<div className={styles.treckedTimesList}>
				<div className={`${styles.row} ${styles.rowHeader}`}>
					<div className={styles.descCol}>Описание</div>
					<div className={styles.durationCol}>Длительность</div>
					<div className={styles.timeCol}>Время</div>
				</div>
				{treckedTimes.map(
					({ id, projectId, startTime, endTime, description }) => (
						<TreckedTimeRow
							key={id}
							id={id}
							projectId={projectId}
							startTime={startTime}
							endTime={endTime}
							description={description}
						/>
					),
				)}
			</div>
		</div>
	);

	const content = isCreating ? <ProjectForm /> : projectContent;

	return <div>{content}</div>;
};
