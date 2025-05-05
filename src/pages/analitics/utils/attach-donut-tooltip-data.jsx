export const attachDonutToolTipData = (el, isProject = false) => {
	const donutToolTipData = (
		<div>
			<div>{isProject === true ? el.name : el.description}</div>
			<div>всего: {el.duration}</div>
		</div>
	);
	return { ...el, donutToolTipData };
};
