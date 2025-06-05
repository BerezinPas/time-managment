import { Button } from '../../components';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUserAsync } from '../../actions';
import { selectUserImageURL, selectUserStartTime } from '../../selectors';
import { OPTIONS_START_TIME_DEFAULT } from '../../constants';
import { useAlert } from '../../context';
import { InputAvatar } from './components';
import styles from './user-page.module.scss';

export const UserPage = () => {
	const userStartTime = useSelector(selectUserStartTime);
	const userImageURL = useSelector(selectUserImageURL);
	const { createAlert } = useAlert();
	const dispatch = useDispatch();

	const { register, handleSubmit, watch, control, reset } = useForm({
		defaultValues: {
			avatar: userImageURL,
			select: OPTIONS_START_TIME_DEFAULT.find(
				(option) => option.value === userStartTime,
			),
		},
	});

	const onSubmit = async (data) => {
		const formData = new FormData();
		formData.append('imageFile', data.avatar[0]);
		formData.append('defaultStartTimeInAnalytics', data.select.value);

		dispatch(setUserAsync(formData)).then(({ res, error }) => {
			if (error) {
				createAlert(error, 'danger');
				return;
			}
			createAlert('Данные успешно обновлены!');
			reset();
		});
	};

	const onLogout = () => {
		dispatch(logout());
	};

	return (
		<div className={styles.page}>
			<form
				className={styles.form}
				onSubmit={handleSubmit(onSubmit)}
				encType="multipart/form-data"
			>
				<InputAvatar register={register} watch={watch} />
				<div className={styles.selectWrapper}>
					<p className={styles.question}>
						Времянной промежуток в аналитике по умолчанию:
					</p>
					<Controller
						name="select"
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<Select
								className={styles.select}
								{...field}
								options={OPTIONS_START_TIME_DEFAULT}
							/>
						)}
					/>
					<Button type="submit">Сохранить изменения</Button>
				</div>
			</form>
			<Button className={styles.btnLogout} variant="danger" onClick={onLogout}>
				Выйти из аккаунта
			</Button>
		</div>
	);
};
