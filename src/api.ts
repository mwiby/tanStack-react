import axios from 'axios';
import {
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

const { status, data, error, isFetching } = useAuthors()
  
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




