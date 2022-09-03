type KeysWithStringValues<T> = {
	[K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export function search<T extends { [k: string]: string }>(
	data: T[],
	fields: KeysWithStringValues<T>[],
	searchTerm: string
): T[] {
	const searchData = data.filter((item) => {
		/**
		 * Do an case insensitive exact match on the search term
		 */
		if (searchTerm.startsWith('"') && searchTerm.endsWith('"')) {
			const searchTermExact = searchTerm.slice(1, searchTerm.length - 1);

			const regEx = new RegExp(searchTermExact, 'ig');

			return fields.some((field) => regEx.test(item[field]));
		}

		/**
		 * Do a case insensitive fuzzy match on the search term
		 */
		const regEx = new RegExp(searchTerm.split(' ').join('.*'), 'ig');

		return fields.some((field) => regEx.test(item[field]));
	});

	return searchData;
}
