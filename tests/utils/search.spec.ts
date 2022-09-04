import { search } from '../../src/utils/search.utils';

const testData = [
	{
		name: 'District Data Officer',
		image: 'http://lorempixel.com/640/480',
		description:
			'Perspiciatis suscipit eius. Atque dolorem eligendi rerum et aut laborum et quidem. Excepturi minima omnis debitis necessitatibus suscipit voluptatem neque.',
		dateLastEdited: '2018-01-19T11:21:04.700Z',
	},
	{
		name: 'District Data Liaison',
		image: 'http://lorempixel.com/640/480',
		description:
			'Quis autem quia eos. Similique saepe error qui magnam sint doloremque quo quasi voluptatibus. Pariatur error repudiandae aut libero omnis esse voluptatem numquam. Est repellendus quo maxime iusto in inventore tempora harum.',
		dateLastEdited: '2018-03-03T20:20:14.943Z',
	},
];

describe('Search Util', () => {
	it('should return an empty array if no data is passed', () => {
		const result = search<Record<string, string>>([], ['name'], 'test');

		expect(result).toEqual([]);
	});

	it('should return an empty array if no fields are passed', () => {
		const result = search(testData, [], 'test');

		expect(result).toEqual([]);
	});

	it('should return an empty array if no data is found', () => {
		const result = search(testData, ['name', 'description'], 'test1');

		expect(result).toEqual([]);
	});

	it('should return an array of data if data is found', () => {
		const result = search(testData, ['name', 'description'], 'data');

		expect(result).toEqual(testData);
	});

	it('should return array of data even if words are not in sequence', () => {
		const result = search(testData, ['name', 'description'], 'district officer');

		expect(result).toEqual([testData[0]]);
	});

	it('should do an exact match if the search term is wrapped in double quotes', () => {
		const result = search(testData, ['name', 'description'], '"District Data Officer"');

		expect(result).toEqual([testData[0]]);
	});

	it('should return empty array if the search term is wrapped in double quotes and no exact match is found', () => {
		const result = search(testData, ['name', 'description'], '"District Officer"');

		expect(result).toEqual([]);
	});
});
