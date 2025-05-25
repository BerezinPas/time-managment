import { useState } from 'react';
import { calcClipPath, getToolTipCoors } from '../../utils';
import styles from './segment.module.scss';

export const Segment = ({ segment }) => {
	const [showToolTip, setShowToolTip] = useState(false);

	const onHover = () => {
		setShowToolTip(true);
	};
	const onLeave = () => {
		setShowToolTip(false);
	};

	const toolTipCoors = getToolTipCoors(
		segment.percentageOfTotal,
		segment.angle,
	);
	return (
		<>
			<div
				onMouseEnter={(e) => onHover(e)}
				onMouseLeave={() => onLeave()}
				className={`${styles.segment} `}
				key={segment.id}
				style={{
					clipPath: calcClipPath(segment.percentageOfTotal),
					transform: `rotate(${segment.angle}deg) `,
					backgroundColor: `${segment.color}`,
				}}
			></div>
			<span
				className={styles.number}
				style={{
					transform: `rotate(${(segment.percentageOfTotal * 360) / 200 + segment.angle}deg)`,
				}}
			>
				<span
					style={{
						transform: `rotate(-${(segment.percentageOfTotal * 360) / 200 + segment.angle}deg)`,
					}}
				>
					{Number(segment.percentageOfTotal).toFixed(0)}%
				</span>
			</span>
			{showToolTip && (
				<span
					style={{
						top: `${toolTipCoors.top}%`,
						right: `${toolTipCoors.right + 5}%`,
					}}
					className={styles.toolTip}
				>
					{segment.donutToolTipData}
				</span>
			)}
		</>
	);
};
