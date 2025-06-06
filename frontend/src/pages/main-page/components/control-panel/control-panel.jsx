import { Button } from '../../../../components';

export const ControlPanel = ({
	isTimeGoing,
	currentTime,
	onTimerPause,
	onTimerStop,
	onTimerStart,
	options,
	...props
}) => {
	return (
		<div {...props}>
			<Button
				disabled={isTimeGoing || options.length === 0}
				onClick={onTimerStart}
			>
				▶
			</Button>
			<Button
				onClick={onTimerPause}
				disabled={!isTimeGoing}
				variant="secondary"
			>
				⏸
			</Button>
			<Button onClick={onTimerStop} disabled={!currentTime} variant="danger">
				⏹
			</Button>
		</div>
	);
};
