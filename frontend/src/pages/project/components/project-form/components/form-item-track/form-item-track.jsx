import { Button, Input } from '../../../../../../components';
import styles from './form-item-track.module.scss';

export const FormItemTrack = ({
	id,
	register,
	unregister,
	setDeleteTracksId,
	setNewTracks,
}) => {
	const onDelete = () => {
		if (!String(id).includes('generated')) {
			setDeleteTracksId((prev) => [...prev, id]);
		}
		unregister([
			`description-${id}`,
			`startTime-${id}`,
			`endTime-${id}`,
			`startDay-${id}`,
		]);
		setNewTracks((prev) => [...prev.filter((el) => id !== el.id)]);
	};

	return (
		<div className="row">
			<div className={styles.descCol}>
				<Input placeholder="Описание..." {...register(`description-${id}`)} />
			</div>
			<div className={styles.timeCol}>
				<Input type="time" {...register(`startTime-${id}`)} />
				{' - '}
				<Input type="time" {...register(`endTime-${id}`)} />
				<Input type="date" {...register(`startDay-${id}`)} max="2108-12-31" />
			</div>
			<Button type="button" variant="danger" onClick={onDelete}>
				удалить
			</Button>
		</div>
	);
};
