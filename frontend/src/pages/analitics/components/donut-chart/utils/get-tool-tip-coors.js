export const getToolTipCoors = (percentageOfTotal, angle) => {
	const angleEnd = (percentageOfTotal * 360) / 100 + angle;

	if (angleEnd < 180) {
		const diffHeight =
			Math.cos((((angleEnd - angle) / 2 + angle) * Math.PI) / 180) * 50;

		const top = 50 - diffHeight;

		return { top, right: 0 };
	} else {
		const diffHeight =
			-Math.cos((((angleEnd - angle) / 2 + angle - 180) * Math.PI) / 180) * 50;

		const top = 50 - diffHeight;
		if (angle < 270 && angleEnd > 270) {
			return { top, right: 50 };
		}
		if (angleEnd > 270) {
			const right = Math.sin(((angle - 180) * Math.PI) / 180) * 50;
			return { top, right };
		}

		const right = Math.sin(((angleEnd - 180) * Math.PI) / 180) * 50;

		return { top, right };
	}
};
