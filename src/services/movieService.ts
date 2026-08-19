import axios from 'axios';
import type { Movie } from '../types/movie';

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const movieApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
});

export const fetchMovies = async (query: string, page: number): Promise<MoviesResponse> => {
  const response = await movieApi.get<MoviesResponse>('/search/movie', {
    params: {
      query,
      page,
    },
  });
  return response.data;
};