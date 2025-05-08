import { useForm } from 'react-hook-form';
import { Button, Input } from '../../components';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { loginSchema, passwordSchema } from '../../schemes';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadOptionsAsync, loadProjectsAsync, setUser } from '../../actions';
import styles from './authorization.module.scss';
import { useNavigate } from 'react-router-dom';
import { server } from '../../bff';
import { Link } from 'react-router-dom';

export const Authorization = () => {
	const dispatch = useDispatch();
	const [serverError, setServerError] = useState(null);
	const navigate = useNavigate();

	const registerFormSchema = yup.object().shape({
		login: loginSchema,
		password: passwordSchema,
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(registerFormSchema),
	});

	const formError =
		errors?.login?.message ||
		errors?.password?.message ||
		errors?.passwordCheck?.message;

	const errorMessage = serverError || formError;

	// console.log(errors);
	const onSubmit = async ({ login, password }) => {
		const { error, res } = await server.authorizate(login, password);
		if (error) {
			setServerError(error);
			return;
		}
		dispatch(setUser(res));
		dispatch(loadProjectsAsync(res.id));
		dispatch(loadOptionsAsync(res.id));

		sessionStorage.setItem('userData', JSON.stringify(res));
		navigate('/');
	};

	return (
		<div className="container container__auth">
			<h2 className={`${styles.title} h2`}>Авторизация</h2>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<Input
					isValid={!errors?.login}
					type="text"
					placeholder={'логин'}
					{...register('login')}
				/>
				<Input
					isValid={!errors?.password}
					type="password"
					placeholder={'пароль'}
					{...register('password')}
				/>

				<Button className={styles.btn} type="submit">
					Войти
				</Button>
				{errorMessage && <div className="error">{errorMessage}</div>}
				<div>
					Нет Аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
				</div>
			</form>
		</div>
	);
};
