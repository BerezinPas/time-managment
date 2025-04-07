import { useForm } from 'react-hook-form';
import { Button, Input } from '../../../../components';
import * as yup from 'yup';
import { dataTrackSchema, nameProjectShema } from '../../../../schemes';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { saveProjectAsync } from '../../../../actions';
import { useNavigate } from 'react-router-dom';
import { selectUserId } from '../../../../selectors';
import styles from './project-form.module.scss';
import { useState } from 'react';
import { FormItemTrack } from './components';
import {
	groupByTrecks,
	groupDirtyFieldsByTracks,
	initFormValues,
	formateTrack,
	generateId,
} from './utils';

export const ProjectForm = ({ project, isCreating }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userId = useSelector(selectUserId);

	const [newTrackedTimes, setNewTrackedTimes] = useState(project.treckedTimes);
	const [deletedTracksId, setDeleteTracksId] = useState([]);

	const projectFormSchema = yup.object().shape({
		name: nameProjectShema,

		...newTrackedTimes.reduce((acc, cur) => {
			acc[`startDay-${cur.id}`] = dataTrackSchema;
			return acc;
		}, {}),
	});

	const {
		formState: { dirtyFields, errors },
		register,
		handleSubmit,
		setValue,
		unregister,
	} = useForm({
		defaultValues: initFormValues(project),
		resolver: yupResolver(projectFormSchema),
	});

	const onSubmit = (formData) => {
		const updatedTrecks = groupDirtyFieldsByTracks(
			dirtyFields,
			formData,
			project.id,
		);

		const tracksData = groupByTrecks(formData, project.id);

		const createdTrecks = tracksData.filter(({ id }) =>
			id.includes('generated'),
		);

		dispatch(
			saveProjectAsync({
				id: project.id,
				userId,
				name: formData.name,
				treckedTimes: {
					create: createdTrecks.map(formateTrack) || [],
					update:
						updatedTrecks.map((el) =>
							formateTrack(
								el,
								tracksData.find(({ id }) => Number(el.id) === Number(id)),
							),
						) || [],
					delete: deletedTracksId || [],
				},
			}),
		).then(({ project }) => {
			navigate(`/project/${project.id}`);
		});
	};

	const errorMessage = Object.values(errors)[0]?.message;

	const content = (
		<>
			<div className=" ">
				<Input placeholder="Название проекта" {...register(`name`)} />
			</div>

			<div className={styles.controlPanel}>
				{errorMessage && <div className="error">{errorMessage}</div>}
				<div className={styles.controlBtns}>
					<Button
						variant="secondary"
						type="button"
						// TODO FOCUS onCREATE DECS input
						onClick={() => {
							const newId = generateId();
							setNewTrackedTimes((prev) => [
								{
									id: newId,
									projectId: project.id,
									startTime: Date.now(),
									endTime: Date.now(),
									description: '',
								},
								...prev,
							]);

							setValue(
								`startDay-${newId}`,
								new Date().toISOString().slice(0, 10),
							);
							setValue(
								`startTime-${newId}`,
								new Date().toLocaleTimeString().slice(0, -3),
							);
							setValue(
								`endTime-${newId}`,
								new Date().toLocaleTimeString().slice(0, -3),
							);
						}}
					>
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

			{newTrackedTimes.map(({ id, description, startTime, endTime }) => (
				<FormItemTrack
					key={id}
					id={id}
					register={register}
					unregister={unregister}
					setDeleteTrecksId={setDeleteTracksId}
					setNewTreckedTimes={setNewTrackedTimes}
				/>
			))}
		</>
	);

	return (
		<div className="container">
			{isCreating ? <h2 className="h2">Новый проект</h2> : ''}
			{content}
		</div>
	);
};
