import styles from './input.module.scss';

export const Input = ({ isValid = true, ...props }) => (
	<input
		{...props}
		className={`${styles.input} ${isValid ? '' : styles.inValid}`}
	/>
);
