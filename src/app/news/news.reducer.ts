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
  article: any
}

export const initialState: NewsState = {
  newsAll: [],
  loading: false,
  error: null,
  filteredNews: [],
  article: null
};

export const newsReducer = createReducer(
  initialState,
  on(NewsActions.loadNews, (state) => ({ ...state, loading: true, error: null })),
  on(NewsActions.loadNewsSuccess, (state, { news }) => ({ ...state, newsAll: news.results, loading: false })),
  on(NewsActions.loadNewsFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(NewsActions.filterNews, (state, { keyword }) => ({
    ...state, 
    filteredNews: state.newsAll.filter((newsItem) => {
      if (keyword === '') {return newsItem}
      // приводимо в нижній регістр, розділяємо на окремі слова по пробілу, зі слів забираємо все, крім цифр і літер
      const titleWords = newsItem.title.toLowerCase().split(' ').map(word => word.replace(/[^a-z0-9]/ig, ''));
      const descriptionWords = newsItem.summary.toLowerCase().split(' ').map(word => word.replace(/[^a-z0-9]/ig, ''));
      const searchWords = keyword.toLowerCase().split(' ').map(word => word.replace(/[^a-z0-9]/ig, ''));
      return titleWords.some(titleWord => searchWords.includes(titleWord)) || descriptionWords.some(titleWord => searchWords.includes(titleWord));
    }).sort((a, b) => {
      const searchWords = keyword.toLowerCase().split(' ').map(word => word.replace(/[^a-z0-9]/ig, ''));
      const titleWords = a.title.toLowerCase().split(' ').map(word => word.replace(/[^a-z0-9]/ig, ''));
      const a1Here = titleWords.some(titleWord => searchWords.includes(titleWord))
      if (a1Here) {
        return -1
      } else {
        return 0
      }
    })
  })),
  on(NewsActions.loadArticle, (state) => ({ ...state, loading: true, error: null })),
  on(NewsActions.loadArticleSuccess, (state, { article }) => ({ ...state, article: article, loading: false })),
  on(NewsActions.loadArticleFailure, (state, { error }) => ({ ...state, error, loading: false })),
);


