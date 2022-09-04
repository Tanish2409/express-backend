import { paginate, getPaginatedResponse } from '../../src/utils/paginate.utils';

describe('Paginate Utils', () => {
	describe('paginate', () => {
		it('should return paginated data', () => {
			const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			const page = 1;
			const limit = 5;

			const paginatedData = paginate(data, page, limit);

			expect(paginatedData).toEqual([1, 2, 3, 4, 5]);
		});

		it('should return empty array if no page found', () => {
			const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			const page = 3;
			const limit = 5;

			const paginatedData = paginate(data, page, limit);

			expect(paginatedData).toEqual([]);
		});
	});

	describe('getPaginatedResponse', () => {
		it('should return paginated response', () => {
			const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
			const page = 1;
			const limit = 5;
			const paginatedData = data.slice(0, limit);

			const paginatedResponse = getPaginatedResponse('data', paginatedData, page, limit, 10);

			expect(paginatedResponse).toEqual({
				data: paginatedData,
				page,
				pages: Math.ceil(data.length / limit),
				limit,
				totalCount: data.length,
			});
		});
	});
});
