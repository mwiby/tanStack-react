import axios from 'axios';
import {
  useQuery
} from '@tanstack/react-query'
  
export interface Author {
  id: number;
  name: string;
}

export const useAuthors = () => {
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







