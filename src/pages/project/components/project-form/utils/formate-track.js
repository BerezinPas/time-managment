export const formateTrack = (track, fields) => {
	console.log('default', track, fields);

	if (
		track.startTime === undefined &&
		track.endTime === undefined &&
		track.startDay === undefined
	) {
		return track;
	}
	let startDay = track.startDay ? track.startDay : fields.startDay;
	let newStartTime = new Date(
		`${startDay}T${track.startTime || fields.startTime}`,
	);
	let newEndTime = new Date(`${startDay}T${track.endTime || fields.endTime}`);

	// console.log(`${startDay}T${fields.startTime}`);

	console.log('newEndTime', newEndTime);
	console.log(
		'parse',
		Date.parse(`${startDay}T${track.endTime || fields.endTime}`),
	);
	console.log('newStartTime', newStartTime);

	if (newStartTime > newEndTime) {
		// console.log('fields', fields);
		// console.log(
		// 	'UTC start )))',
		// 	new Date(`${startDay}T${fields.startTime}`).toISOString(),
		// );
		// console.log(
		// 	'UTC end )))',
		// 	new Date(`${startDay}T${fields.endTime}`) -
		// 		new Date(`${startDay}T${fields.startTime}`),
		// );
		const newdateEEND = Date.parse(newEndTime) + 1000 * 60 * 60 * 24;

		console.log('sss.newStartTime', newStartTime.toISOString());
		console.log('sss.newEndTime', newEndTime.toISOString());
		console.log('sss.newEndTime', new Date(newdateEEND).toISOString());
		return {
			...track,
			endTime: new Date(newdateEEND).toISOString(),
			startTime: newStartTime.toISOString(),
		};
	}

	return {
		...track,
		endTime: newEndTime.toISOString(),
		startTime: newStartTime.toISOString(),
	};
};
