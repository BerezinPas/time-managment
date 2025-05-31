import { useState } from 'react';
import { Button, Input } from '../../components';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setOptionsAsync, setUser, setUserAsync } from '../../actions';
import {
	selectOptions,
	selectUserImageURL,
	selectUserSessions,
	selectUserStartTime,
} from '../../selectors';
import { OPTIONS_START_TIME_DEFAULT } from '../../constants';

export const UserPage = () => {
	const [value, setValue] = useState('');
	// const userOptions = useSelector(selectOptions);
	const userHash = useSelector(selectUserSessions);
	// console.log('UserPageuserOtions', userOptions);
	const userStartTime = useSelector(selectUserStartTime);
	const userImageURL = useSelector(selectUserImageURL);
	// const [selectedValue, setSelectedValue] = useState(options[0]);

	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			avatar: userImageURL,
			select: OPTIONS_START_TIME_DEFAULT.find(
				(option) => option.value === userStartTime,
			),
		},
	});

	const onSubmit = (optionsData) => {
		const data = {
			imageURL: optionsData.avatar,
			defaultStartTimeInAnalytics: optionsData.select.value,
		};
		console.log('onSubmit', data);
		dispatch(setUserAsync(data));
	};

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
	};
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					// value={value}
					// onChange={(e) => {
					// 	// console.log(e.target.value);
					// 	// setValue(e.target.value);
					// }}
					{...register('avatar')}
				/>
				<div>
					Времянной промежуток в аналитике по умолчанию
					<Controller
						name="select"
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<Select
								{...field}
								// value={selectedValue}
								// onChange={(e) => setSelectedValue(e)}
								options={OPTIONS_START_TIME_DEFAULT}
							/>
						)}
					/>
					<Button type="submit">Save</Button>
				</div>
			</form>
			<Button variant="danger" onClick={onLogout}>
				Выход
			</Button>
			{/* <img src={value} alt="" /> */}
		</div>
	);
};
{
	/* <div>Сменить пароль</div>
				<div>
					<Input type="password" placeholder="Старый пароль" />
					<Input type="password" placeholder="Новый пароль" />
				</div> */
}
