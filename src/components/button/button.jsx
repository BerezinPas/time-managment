import styles from './button.module.scss';

/**
 * @param {{
 * children: any,
 * variant: 'delete' | 'secondary' | 'primary'
 *  }} props
 *
 */

export const Button = ({ variant, children, ...props }) => {
	let classes = `${styles.btn} `;
	switch (variant) {
		case 'delete':
			classes += styles.delete;
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
