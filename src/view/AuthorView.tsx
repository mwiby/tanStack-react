import React from 'react';
import { useAuthors } from '../api';

const AuthorView = () => {
  const { status, data, error, isFetching } = useAuthors();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Authors</h1>
      <div>
        {data && data.length > 0 ? (
          data.map((author: { id: number, name: string }) => (
            <p key={author.id}>
              <span>{author.name}</span>
            </p>
          ))
        ) : (
          <div>No authors found.</div>
        )}
        {isFetching && <div>Background Updating...</div>}
      </div>
    </div>
  );
};

export default AuthorView;