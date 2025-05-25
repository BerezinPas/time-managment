export const calcClipPath = (percent) => {
	const angle = (percent * 360) / 100;
	if (angle >= 315) {
		const x = 50 - Math.tan(((360 - angle) * Math.PI) / 180) * 50;
		// console.log('angle >= 315,', x);

		return `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%,0% 0%, ${x}% 0%)`;
	} else if (angle >= 270) {
		const y = 50 - Math.tan(((angle - 270) * Math.PI) / 180) * 50;
		// console.log('angle > 270', y);

		return `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%,0% ${y}%)`;
	} else if (angle >= 225) {
		const y = 50 + Math.tan(((270 - angle) * Math.PI) / 180) * 50;
		// console.log('angle > 225', y);

		return `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%,0% ${y}%)`;
	} else if (angle >= 180) {
		const x = 50 - Math.tan(((angle - 180) * Math.PI) / 180) * 50;
		// console.log('angle > 180', x);

		return `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, ${x}% 100%)`;
	} else if (angle >= 135) {
		const x = 50 + Math.tan(((180 - angle) * Math.PI) / 180) * 50;
		// console.log('angle > 135', x);

		return `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, ${x}% 100%)`;
	} else if (angle >= 90) {
		const y = 50 + Math.tan(((angle - 90) * Math.PI) / 180) * 50;
		// console.log('angle > 90', y);

		return `polygon(50% 50%, 50% 0%, 100% 0%,  100% ${y}%)`;
	} else if (angle >= 45) {
		const y = 50 - Math.tan(((90 - angle) * Math.PI) / 180) * 50;
		// console.log('angle > 45', y);

		return `polygon(50% 50%, 50% 0%, 100% 0%,  100%  ${y}%)`;
	} else {
		const x = 50 + Math.tan((angle * Math.PI) / 180) * 50;
		// console.log('angle > 45', x);

		return `polygon(50% 50%, 50% 0%,  ${x}%  0%)`;
	}
};
