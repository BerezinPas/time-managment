import { useAlert } from '../../context';
import { Alert } from './components/alert';

export const Alerts = () => {
	const { alerts, removeAlert } = useAlert();
	return (
		<div
			style={{
				position: 'absolute',
				right: 50,
				top: 100,
				pointerEvents: 'none',
			}}
		>
			{alerts.map(({ text, id, ms, type }) => (
				<Alert
					key={id}
					text={text}
					type={type}
					ms={ms}
					onRemove={() => removeAlert(id)}
				/>
			))}
		</div>
	);
};
