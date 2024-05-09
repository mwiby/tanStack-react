import axios from 'axios'
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
//import AuthorView from './view/AuthorView.jsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='container'>
      <ListAuthors />
      </div>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  )
};

const useAuthors = () => {
  return useQuery({
    queryKey: ['authors'],
    queryFn: async () => {
      const { data } = await axios.get(
        'http://localhost:8080/authors',
      )
      return data
    },
  })
};

const ListAuthors = () => {

  const { status, data, error, isFetching } = useAuthors()

  return (
    <div>
      <h1>Authors</h1>
      <div>
        {status === 'pending' ? (
          'Loading...'
        ) : status === 'error' ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              {data.map((author: { id: number; name: string }) => (
                <p key={author.id}>
                <span>{author.name}</span>
                </p>
              ))}
            </div>
            <div>{isFetching ? 'Background Updating...' : ' '}</div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
