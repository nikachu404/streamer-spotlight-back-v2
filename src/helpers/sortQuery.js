export const sortQuery = (query, sortBy, sortOrder) => {
  switch (sortBy) {
    case 'createdAt':
      return query.sort({ createdAt: sortOrder === 'asc' ? 1 : -1 });
    case 'upvotes':
      return query.sort({ upvotes: sortOrder === 'asc' ? 1 : -1 });
    case 'downvotes':
      return query.sort({ downvotes: sortOrder === 'asc' ? 1 : -1 });
    default:
      return query;
  }
};