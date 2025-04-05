import { useForm } from 'react-hook-form';
import { Input } from '../../../../components';
import * as yup from 'yup';
import { nameProjectShema } from '../../../../schemes';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { saveProjectAsync } from '../../../../actions';
import { useNavigate } from 'react-router-dom';
import { selectUserId } from '../../../../selectors';

export const ProjectForm = ({ id }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userId = useSelector(selectUserId);

	const projectFormSchema = yup.object().shape({
		name: nameProjectShema,
	});
	const { register, handleSubmit } = useForm({
		defaultValues: {
			name: '',
		},
		resolver: yupResolver(projectFormSchema),
	});
	const onSubmit = ({ name }) => {
		dispatch(saveProjectAsync({ id, name, userId })).then(
			({ id: createdId }) => {
				navigate(`/project/${createdId}`);
			},
		);
	};
	return (
		<div>
			<h3>Создание проекта</h3>
			<form action="#" onSubmit={handleSubmit(onSubmit)}>
				<Input placeholder="название проекта" {...register('name')} />
			</form>
		</div>
	);
};

// TODO настроить редактирование и переделать  добавление проектов