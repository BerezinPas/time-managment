import { useForm } from 'react-hook-form';
import { Button, Input, Loader } from '../../../../components';
import * as yup from 'yup';
import { dataTrackSchema, nameProjectShema } from '../../../../schemes';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { saveProjectAsync } from '../../../../actions';
import { useNavigate } from 'react-router-dom';
import styles from './project-form.module.scss';
import { useEffect, useState } from 'react';
import { FormItemTrack } from './components';
import {
	groupByTracks,
	groupDirtyFieldsByTracks,
	initFormValues,
	formateTrack,
	generateId,
} from './utils';
import { dateToYYYYMMDD } from '../../../../utils';

export const ProjectForm = ({ project, isCreating }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [newTracks, setNewTracks] = useState([...project.tracks]);
	const [deletedTracksId, setDeleteTracksId] = useState([]);
	const [isLoading, setIsloading] = useState(false);

	const [serverError, setServerError] = useState('');
	const projectFormSchema = yup.object().shape({
		name: nameProjectShema,

		...newTracks.reduce((acc, cur) => {
			acc[`startDay-${cur.id}`] = dataTrackSchema;
			return acc;
		}, {}),
	});

	const {
		formState: { dirtyFields, errors },
		setFocus,
		register,
		handleSubmit,
		setValue,
		unregister,
	} = useForm({
		defaultValues: initFormValues(project),
		resolver: yupResolver(projectFormSchema),
	});

	const onSubmit = (formData) => {
		const updatedTracks = groupDirtyFieldsByTracks(
			dirtyFields,
			formData,
			project.id,
		);

		const tracksData = groupByTracks(formData, project.id);

		const createdTracks = tracksData.filter(({ id }) =>
			id.includes('generated'),
		);
		setIsloading(true);
		dispatch(
			saveProjectAsync({
				id: project.id,
				name: formData.name,
				tracks: {
					create: createdTracks.map(formateTrack) || [],
					update:
						updatedTracks.map((el) =>
							formateTrack(
								el,
								tracksData.find(({ id }) => el.id === id),
							),
						) || [],
					delete: deletedTracksId || [],
				},
			}),
		)
			.then(({ res, error }) => {
				if (error) {
					console.log(error);
					setServerError(error);
					return;
				}
				navigate(`/project/${res.id}`);
			})
			.finally(() => {
				setIsloading(false);
			});
	};

	const errorMessage = serverError || Object.values(errors)[0]?.message;
	const [createdTrackId, setCreatedTrackId] = useState(null);

	useEffect(() => {
		setFocus(`description-${createdTrackId}`);
	}, [createdTrackId]);

	const onAddTrack = () => {
		const newId = generateId();
		setCreatedTrackId(newId);
		setFocus(`description-${newId}`);
		setNewTracks((prev) => [
			{
				id: newId,
				projectId: project.id,
			},
			...prev,
		]);

		setValue(`startDay-${newId}`, dateToYYYYMMDD(new Date()));
		setValue(
			`startTime-${newId}`,
			new Date().toLocaleTimeString().slice(0, -3),
		);
		setValue(`endTime-${newId}`, new Date().toLocaleTimeString().slice(0, -3));
	};

	const content = (
		<>
			{isCreating ? <h2 className="h2">Новый проект</h2> : ''}

			<div className=" ">
				<Input placeholder="Название проекта" {...register(`name`)} />
			</div>

			<div className={styles.controlPanel}>
				{errorMessage && <div className="error">{errorMessage}</div>}
				<div className={styles.controlBtns}>
					<Button variant="secondary" type="button" onClick={onAddTrack}>
						добавить запись
					</Button>
					<Button
						variant="primary"
						onClick={handleSubmit(onSubmit)}
						type="submit"
					>
						{isCreating ? 'создать проект' : 'сохранить'}
					</Button>
				</div>
			</div>

			{newTracks.map(({ id }) => (
				<FormItemTrack
					key={id}
					id={id}
					register={register}
					unregister={unregister}
					setDeleteTracksId={setDeleteTracksId}
					setNewTracks={setNewTracks}
				/>
			))}
		</>
	);

	return <div className="container">{isLoading ? <Loader /> : content}</div>;
};
