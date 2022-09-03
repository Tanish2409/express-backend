import type { Request, Response } from 'express';
import { postData } from '@/data/postsData';
import type { IPostData } from '@/data/postsData';
import { search } from '@/utils/search.utils';
import { getPaginatedResponse, paginate } from '@/utils/paginate.utils';

interface IGetPostQuery {
	query?: string;
	page?: string;
	limit?: string;
	sort?: 'asc' | 'desc';
	sortBy?: keyof Pick<IPostData, 'name' | 'dateLastEdited'>;
}

export function getPosts(req: Request, res: Response) {
	const { query = '', page = '1', limit = '10', sort = 'asc', sortBy }: IGetPostQuery = req.query;

	let posts: IPostData[] = postData;

	/**
	 * Update Posts based on search query
	 */
	if (query) {
		posts = search(postData, ['name', 'description'], query);
	}

	/**
	 * Paginate Posts
	 */
	let paginatedPosts = paginate(posts, parseInt(page), parseInt(limit));
	const totalCount = posts.length;

	/**
	 * Sort Posts on Paginated Posts to increase performance
	 */
	if (sortBy) {
		if (sortBy !== 'name' && sortBy !== 'dateLastEdited') {
			return res.status(404).json({
				message: 'Invalid sortBy value',
			});
		}

		paginatedPosts = paginatedPosts.sort((a, b) => {
			if (sort === 'asc') {
				return a[sortBy] > b[sortBy] ? 1 : -1;
			}

			return a[sortBy] < b[sortBy] ? 1 : -1;
		});
	}

	const paginatedResponse = getPaginatedResponse('posts', paginatedPosts, parseInt(page), parseInt(limit), totalCount);

	res.status(200).json(paginatedResponse);
}
