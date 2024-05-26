import axios from 'axios'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthorView from './view/AuthorView.jsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='container'>
        <AuthorView />
      </div>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  )
};



export default App
