import styles from './button.module.scss';

/**
 * @param {{
 * children: any,
 * variant: 'danger' | 'secondary' | 'primary'
 *  }} props
 *
 */

export const Button = ({ variant, children, ...props }) => {
	let classes = `${styles.btn} `;
	switch (variant) {
		case 'danger':
			classes += styles.danger;
			break;
		case 'secondary':
			classes += styles.secondary;
			break;

		default:
			break;
	}
	return (
		<button className={classes} {...props}>
			{children}
		</button>
	);
};
