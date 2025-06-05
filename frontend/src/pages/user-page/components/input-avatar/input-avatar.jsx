import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './input-avatar.module.scss';
import { selectUserImageURL } from '../../../../selectors';

export const InputAvatar = ({ watch, register }) => {
	const avatar = useSelector(selectUserImageURL);
	const [img, setImg] = useState(avatar);

	useEffect(() => {
		const imageUrl = watch('avatar')[0]?.name
			? URL.createObjectURL(watch('avatar')[0])
			: avatar;
		setImg(imageUrl);
	}, [watch('avatar')]);

	return (
		<label className={styles.inputAvatar}>
			<img className={styles.img} src={img} alt="avatar" />
			<span>+</span>
			<input type="file" accept="image/*" {...register('avatar')} />
		</label>
	);
};
