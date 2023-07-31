// news.reducer.ts

import { createReducer, on } from '@ngrx/store';
import * as NewsActions from './news.actions';

export interface OneNews {
  featured: boolean;
  id: number;
  image_url: string;
  launches: any;
  news_site: string;
  published_at: string;
  summary: string;
  title: string;
  updated_at: string;
  url: string;
}

export interface NewsState {
  newsAll: OneNews[];
  loading: boolean;
  error: any;
  filteredNews: OneNews[],
}

export const initialState: NewsState = {
  newsAll: [],
  loading: false,
  error: null,
  filteredNews: []
};

export const newsReducer = createReducer(
  initialState,
  on(NewsActions.loadNews, (state) => ({ ...state, loading: true, error: null })),
  on(NewsActions.loadNewsSuccess, (state, { news }) => ({ ...state, newsAll: news.results, loading: false })),
  on(NewsActions.loadNewsFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(NewsActions.filterNews, (state, { keyword }) => ({
    ...state, 
    filteredNews: state.newsAll.filter((item) => item.title.includes(keyword)), 
  })),
);


