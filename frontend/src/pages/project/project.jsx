import { useLayoutEffect, useState } from 'react';
import { Link, useMatch, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectProject, selectProjects } from '../../selectors';
import {
	CLOSE_MODAL,
	deleteProjectAsync,
	loadProjectAsync,
	openModal,
	RESET_PROJECT_DATA,
} from '../../actions';
import { ProjectForm } from './components/project-form/project-form';
import { Button, Loader, Pagination } from '../../components';
import { TrackRow } from './components';
import styles from './project.module.scss';
import { useAlert } from '../../context';

export const Project = () => {
	const params = useParams();
	const isCreating = useMatch('/project');
	const isEditing = !!useMatch('/project/:id/edit');
	const dispatch = useDispatch();
	const [isLoading, setIsloading] = useState(true);
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState(null);
	const project = useSelector(selectProject);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const { createAlert } = useAlert();

	// const projects = useSelector(selectProjects);
	// const project = projects.find(
	// 	(findProject) => findProject.id === params.id,
	// ) || { name: '', id: null, tracks: [], userId: null };

	// const tracks = project?.tracks || [];
	// const tracksId = tracks.map((track) => track.id);

	// const [project, setProject] = useState();

	useLayoutEffect(() => {
		setIsloading(true);
		if (isCreating) {
			setIsloading(false);
			dispatch(RESET_PROJECT_DATA);
			return;
		}
		dispatch(loadProjectAsync(params.id, page, 10))
			.then(({ error, res }) => {
				if (error) {
					setErrorMessage(error);
				}
				setLastPage(res.lastPage);
			})
			.finally(() => setIsloading(false));
	}, [params.id, dispatch, isCreating, page]);

	const onDelete = (id) => {
		dispatch(
			openModal({
				title: 'Удаление проекта',
				text: 'Точно хотите удалить проект?',
				onConfirm: () => {
					setIsloading(true);
					dispatch(CLOSE_MODAL);
					dispatch(deleteProjectAsync(id))
						.then(({ error, res }) => {
							if (error) {
								createAlert(error, 'danger');
								return;
							}
							createAlert('Проект успешно удален!', 'success');
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

	if (isLoading) {
		return <Loader />;
	}

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
					<Button variant="danger" onClick={() => onDelete(project.id)}>
						удалить
					</Button>
				</div>
			</h2>
			{project.tracks.length === 0 ? (
				'Нет ни одного трека'
			) : (
				<div className={styles.tracksList}>
					<div className="row rowHeader">
						<div className={styles.descCol}>Описание</div>
						<div className={styles.durationCol}>Длительность</div>
						<div className={styles.timeCol}>Время</div>
					</div>
					{project.tracks
						.sort((a, b) => Date.parse(b.startTime) - Date.parse(a.startTime))
						.map(({ id, startTime, endTime, description }) => (
							<TrackRow
								key={id}
								startTime={startTime}
								endTime={endTime}
								description={description}
							/>
						))}
					{lastPage > 1 && (
						<Pagination
							style={{ marginTop: 25 }}
							page={page}
							setPage={setPage}
							lastPage={lastPage}
						/>
					)}
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

	return <div>{content}</div>;
};
