import { URL } from '../constants';
import { transformOptions } from '../transformers';

export const getOptions = (login) =>
	fetch(`${URL}/options?userId=${login}`)
		.then((options) => options.json())
		.then(([options]) => transformOptions(options));
