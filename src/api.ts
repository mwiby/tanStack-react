import axios from 'axios';

export interface Author {
  id: number;
  name: string;
}

export const fetchAuthors = async (): Promise<Author[]> => {
  try {
    const { data } = await axios.get<Author[]>('http://localhost:8080/authors');
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch authors: ${error.message}`);
  }
};

// App.tsx
import React from 'react';
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { fetchAuthors, Author } from './api';
import './App.css'; // Import your CSS file

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='container'>
        <ListAuthors />
      </div>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};

const useAuthors = () => {
  return useQuery<Author[], Error>('authors', fetchAuthors);
};

const ListAuthors = () => {
  const { status, data, error, isFetching } = useAuthors();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Authors</h1>
      <div>
        {status === 'loading' ? (
          'Loading...'
        ) : status === 'error' ? (
          <span className="text-red-500">Error: {error?.message}</span>
        ) : (
          <>
            <div>
              {data?.map((author) => (
                <p key={author.id} className="mb-2">
                  <span className="font-bold">{author.name}</span>
                </p>
              ))}
            </div>
            <div className="text-gray-500">
              {isFetching ? 'Background Updating...' : ' '}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;