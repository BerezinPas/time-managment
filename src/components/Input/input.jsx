import styles from './input.module.scss';

export const Input = ({ isValid = true, className, ...props }) => (
	<input
		{...props}
		className={`${className} ${styles.input} ${isValid ? '' : styles.inValid}`}
	/>
);
