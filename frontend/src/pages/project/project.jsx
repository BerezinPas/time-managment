import { useLayoutEffect, useState } from 'react';
import { Link, useMatch, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectProjects } from '../../selectors';
import { CLOSE_MODAL, deleteProjectAsync, openModal } from '../../actions';
import { ProjectForm } from './components/project-form/project-form';
import { Button, Loader } from '../../components';
import { TrackRow } from './components';
import styles from './project.module.scss';

export const Project = () => {
	const params = useParams();
	const isCreating = useMatch('/project');
	const isEditing = !!useMatch('/project/:id/edit');
	const dispatch = useDispatch();
	const [isLoading, setIsloading] = useState(false);
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState(null);

	const projects = useSelector(selectProjects);
	const project = projects.find(
		(findProject) => findProject.id === Number(params.id),
	) || { name: '', id: null, tracks: [], userId: null };

	const tracks = project?.tracks || [];
	const tracksId = tracks.map((track) => track.id);

	useLayoutEffect(() => {
		if (isCreating) {
			return;
		}

		if (project.id === null) {
			setErrorMessage('Проект не найден');
		}
	}, [params.id, dispatch, isCreating]);

	const onDelete = (id, tracksId) => {
		dispatch(
			openModal({
				title: 'Удаление проекта',
				text: 'Точно хотите удалить проект?',
				onConfirm: () => {
					setIsloading(true);
					dispatch(CLOSE_MODAL);
					dispatch(deleteProjectAsync(id, tracksId))
						.then(() => {
							navigate('/projects');
						})
						.finally(() => {
							setIsloading(false);
						});
				},
				onCancel: () => dispatch(CLOSE_MODAL),
				buttonConfirm: {
					variant: 'danger',
					text: 'удалить',
				},
			}),
		);
	};

	const projectContent = (
		<div className="container">
			<h2 className="h2">
				{project.name}
				<div className={styles.controlBtns}>
					<Link to={`/analytics/${params.id}`}>
						<Button variant="secondary">смотреть аналитику</Button>
					</Link>
					<Link to={`/project/${project.id}/edit`}>
						<Button>редактировать</Button>
					</Link>
					<Button
						variant="danger"
						onClick={() => onDelete(project.id, tracksId)}
					>
						удалить
					</Button>
				</div>
			</h2>
			{tracks.length === 0 ? (
				'Нет ни одного трека'
			) : (
				<div className={styles.tracksList}>
					<div className="row rowHeader">
						<div className={styles.descCol}>Описание</div>
						<div className={styles.durationCol}>Длительность</div>
						<div className={styles.timeCol}>Время</div>
					</div>
					{tracks
						.sort((a, b) => Date.parse(b.startTime) - Date.parse(a.startTime))
						.map(({ id, startTime, endTime, description }) => (
							<TrackRow
								key={id}
								startTime={startTime}
								endTime={endTime}
								description={description}
							/>
						))}
				</div>
			)}
		</div>
	);

	if (errorMessage) {
		return (
			<div className="container">
				<div className="error">{errorMessage}</div>
			</div>
		);
	}

	const content =
		isCreating || isEditing ? (
			<ProjectForm project={project} isCreating={isCreating} />
		) : (
			projectContent
		);

	return <div>{isLoading ? <Loader /> : content}</div>;
};
