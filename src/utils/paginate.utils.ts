export function paginate<T>(data: T[], page: number, limit: number): T[] {
	if (limit > data.length) {
		return data;
	}

	const skip = (page - 1) * limit;

	const paginatedResponse = data.slice(skip, limit + skip);

	return paginatedResponse;
}

export function getPaginatedResponse<T>(dataKey: string, data: T[], page: number, limit: number, totalCount: number) {
	const pages = Math.ceil(totalCount / limit);

	const response = {
		[dataKey]: data,
		page,
		pages,
		limit,
		totalCount,
	};

	return response;
}
