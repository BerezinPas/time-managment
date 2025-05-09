import { useSelector } from 'react-redux';
import { Button } from '../button/button';
import styles from './modal.module.scss';
import { selectModal } from '../../selectors';

export const Modal = () => {
	const { isOpen, title, text, onConfirm, onCancel, buttonConfirm } =
		useSelector(selectModal);

	if (!isOpen) {
		return null;
	}
	return (
		<div className={styles.bg}>
			<div onClick={() => onCancel()} className={styles.overlay}></div>

			<div className={styles.window}>
				<div className={styles.title}>
					{title}
					<button onClick={() => onCancel()}>✕</button>
				</div>
				<div className={styles.text}>{text}</div>
				<div className={styles.btns}>
					<Button onClick={() => onCancel()}>отмена</Button>
					<Button onClick={() => onConfirm()} variant={buttonConfirm.variant}>
						{buttonConfirm.text}
					</Button>
				</div>
			</div>
		</div>
	);
};
