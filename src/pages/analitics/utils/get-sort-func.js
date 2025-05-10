import { sortedByData } from './sorted-by-data';
import { sortedByDuration } from './sorted-by-duration';
import { sortedByName } from './sorted-by-name';

export const getSortFunc = ({ field, how }) => {
	switch (field) {
		case 'name':
			return () => sortedByName(how);

		case 'date':
			return () => sortedByData(how);

		default:
			return () => sortedByDuration(how);
	}
};
