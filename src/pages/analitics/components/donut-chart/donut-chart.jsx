import styles from './donut-chart.module.scss';
import { Segment } from './components';

export const DonutChart = ({ segments = [], title }) => {
	if (segments.length === 0) {
		return;
	}
	const DIAGRAM_COLORS = [
		'#3f50ce',
		'#e15759',
		'#7a76b7',
		'#ca250f',
		'#f28e2c',
		'#ffea29',
		'#0b3418',
		'#88a19e',
		'#76b6fa',
		'#bd3fce',
		'#3fcec2',
	];

	let totalAngle = 0;
	const enhancedSegments = [...segments]
		.sort((a, b) => b.percentageOfTotal - a.percentageOfTotal)
		.map((segment, index) => {
			const angle = totalAngle;
			totalAngle += (segment.percentageOfTotal * 360) / 100;
			return {
				...segment,
				angle,
				color: DIAGRAM_COLORS[index % DIAGRAM_COLORS.length],
			};
		});

	return (
		<div className={styles.donut}>
			<span className={styles.donutHole}>{title}</span>
			{enhancedSegments.map((segment) => (
				<Segment key={segment.id} segment={segment} />
			))}
		</div>
	);
};
