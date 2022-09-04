import request from 'supertest';
import app from '../../src/server';

describe('GET /api/posts', () => {
	it('should return object with array of posts with status code 200', async () => {
		const response = await request(app).get('/api/posts');

		expect(response.status).toBe(200);

		expect(response.body).toEqual(
			expect.objectContaining({
				posts: expect.arrayContaining([
					expect.objectContaining({
						name: expect.any(String),
						image: expect.any(String),
						description: expect.any(String),
						dateLastEdited: expect.any(String),
					}),
				]),
				page: expect.any(Number),
				pages: expect.any(Number),
				limit: expect.any(Number),
				totalCount: expect.any(Number),
			})
		);
	});

	describe('GET /api/posts?page=2&limit=10', () => {
		it('should return object with array of posts and pagination details with status code 200', async () => {
			const page = 2;

			const response = await request(app).get(`/api/posts?limit=100`);

			const pagiatedResponse = await request(app).get(`/api/posts?page=${page}&limit=10`);

			const expectedResult = response.body.posts.slice(10, 20);

			const actualResult = pagiatedResponse.body.posts;

			expect(pagiatedResponse.status).toBe(200);

			expect(actualResult).toEqual(expectedResult);

			expect(pagiatedResponse.body).toEqual(
				expect.objectContaining({
					posts: expect.arrayContaining([
						expect.objectContaining({
							name: expect.any(String),
							image: expect.any(String),
							description: expect.any(String),
							dateLastEdited: expect.any(String),
						}),
					]),
					page: 2,
					pages: expect.any(Number),
					limit: 10,
					totalCount: expect.any(Number),
				})
			);
		});
	});

	describe('GET /api/posts?sortBy=name', () => {
		it('should return object with array of posts sorted by name in ascending order by default when no direction is specified', async () => {
			const response = await request(app).get(`/api/posts`);

			const expectedResult = response.body.posts.sort((a: Record<string, string>, b: Record<string, string>) =>
				a.name > b.name ? 1 : -1
			);

			const sortedResponse = await request(app).get(`/api/posts?sortBy=name`);

			const actualResult = sortedResponse.body.posts;

			expect(actualResult).toEqual(expectedResult);
		});

		it('should return object with array of posts sorted by name in descending order when direction is specified', async () => {
			const response = await request(app).get(`/api/posts`);

			const expectedResult = response.body.posts.sort((a: Record<string, string>, b: Record<string, string>) =>
				a.name < b.name ? 1 : -1
			);

			const sortedResponse = await request(app).get(`/api/posts?sortBy=name&sort=desc`);

			const actualResult = sortedResponse.body.posts;

			expect(actualResult).toEqual(expectedResult);
		});
	});

	describe('GET /api/posts?sortBy=dateLastEdited', () => {
		it('should return object with array of posts sorted by dateLastEdited in ascending order by default when no direction is specified', async () => {
			const response = await request(app).get(`/api/posts`);

			const expectedResult = response.body.posts.sort((a: Record<string, string>, b: Record<string, string>) =>
				a.dateLastEdited > b.dateLastEdited ? 1 : -1
			);

			const sortedResponse = await request(app).get(`/api/posts?sortBy=dateLastEdited`);

			const actualResult = sortedResponse.body.posts;

			expect(actualResult).toEqual(expectedResult);
		});

		it('should return object with array of posts sorted by dateLastEdited in descending order when direction is specified', async () => {
			const response = await request(app).get(`/api/posts`);

			const expectedResult = response.body.posts.sort((a: Record<string, string>, b: Record<string, string>) =>
				a.dateLastEdited < b.dateLastEdited ? 1 : -1
			);

			const sortedResponse = await request(app).get(`/api/posts?sortBy=dateLastEdited&sort=desc`);

			const actualResult = sortedResponse.body.posts;

			expect(actualResult).toEqual(expectedResult);
		});
	});

	describe('GET /api/posts?sortBy=invalid', () => {
		it('should return 404', async () => {
			const response = await request(app).get(`/api/posts?sortBy=invalid`);

			expect(response.status).toBe(404);
			expect(response.body).toEqual({ message: 'Invalid sortBy value' });
		});
	});
});
