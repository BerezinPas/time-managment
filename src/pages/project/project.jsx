import { useEffect, useLayoutEffect, useState } from 'react';
import {
	Link,
	Navigate,
	useMatch,
	useNavigate,
	useParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectProject, selectTracks } from '../../selectors';
import {
	CLOSE_MODAL,
	deleteProjectAsync,
	loadProjectAsync,
	openModal,
	RESET_PROJECT_DATA,
} from '../../actions';
import { ProjectForm } from './components/project-form/project-form';
import { Button, Loader } from '../../components';
import { TrackRow } from './components';
import styles from './project.module.scss';

export const Project = () => {
	const params = useParams();
	const isCreating = useMatch('/project');
	const isEditing = !!useMatch('/project/:id/edit');
	const dispatch = useDispatch();
	const project = useSelector(selectProject);
	const tracks = useSelector(selectTracks);
	const [isLoading, setIsloading] = useState(true);
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState(null);

	// console.log(isEditing);

	useLayoutEffect(() => {
		dispatch(RESET_PROJECT_DATA);
	}, [dispatch, isCreating]);

	useLayoutEffect(() => {
		if (isCreating) {
			setIsloading(false);
			return;
		}
		dispatch(loadProjectAsync(params.id)).then((res) => {
			setIsloading(false);
			console.log('res', res);

			if (res.id === undefined) {
				setErrorMessage('Проект не найден');
			}
		});
	}, [params.id, dispatch]);

	const onDelete = (id) => {
		const tracksId = tracks.map((track) => track.id);
		return dispatch(deleteProjectAsync(id, tracksId)).then((res) => {
			navigate('/projects');
			return res;
		});
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
						onClick={() =>
							dispatch(
								openModal({
									title: 'Удаление проекта',
									text: 'Точно хотите удалить проект?',
									onConfirm: () => {
										setIsloading(true);
										dispatch(CLOSE_MODAL);
										onDelete(params.id).finally(() => {
											setIsloading(false);
										});
									},
									onCancel: () => dispatch(CLOSE_MODAL),
									buttonConfirm: {
										variant: 'danger',
										text: 'удалить',
									},
								}),
							)
						}
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
						.map(({ id, projectId, startTime, endTime, description }) => (
							<TrackRow
								key={id}
								id={id}
								projectId={projectId}
								startTime={startTime}
								endTime={endTime}
								description={description}
							/>
						))}
				</div>
			)}
		</div>
	);

	console.log('project', project);

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
