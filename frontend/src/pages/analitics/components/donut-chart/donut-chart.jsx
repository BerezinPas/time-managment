import styles from './donut-chart.module.scss';
import { Segment } from './components';
import { DIAGRAM_COLORS } from './diagrams-colors';

export const DonutChart = ({ segments = [], title }) => {
	if (segments.length === 0) {
		return;
	}

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
