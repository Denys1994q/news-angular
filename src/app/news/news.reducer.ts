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
  article: any,
  offset: number;
}

export const initialState: NewsState = {
  newsAll: [],
  offset: 10,
  loading: false,
  error: null,
  filteredNews: [],
  article: null
};

export const newsReducer = createReducer(
  initialState,
  on(NewsActions.loadNews, (state) => ({ ...state, loading: true, error: null })),
  on(NewsActions.loadNewsSuccess, (state, { news }) => ({ 
    ...state, 
    newsAll: [...state.newsAll, ...news.results], 
    loading: false, 
    offset: state.offset + 10
  })),
  on(NewsActions.loadNewsFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(NewsActions.filterNews, (state, { keyword }) => ({
    ...state, 
    filteredNews: state.newsAll.filter((newsItem) => {
      if (keyword === '') {return newsItem}
      // приводимо в нижній регістр, розділяємо на окремі слова по пробілу, зі слів забираємо все, крім цифр і літер
      const titleWords = newsItem.title.trim().toLowerCase().split(' ').map(word => {
        if (!/[a-zA-Z0-9]/.test(word)) return
        // замінюємо & на пустий рядок і виходить, що завжди тру він
        return word.trim().replace(/[^a-z0-9]/ig, '')
      });
      const descriptionWords = newsItem.summary.trim().toLowerCase().trim().split(' ').map(word => {
        if (!/[a-zA-Z0-9]/.test(word)) return
        return word.trim().replace(/[^a-z0-9]/ig, '')
      });
      const searchWords = keyword.trim().toLowerCase().split(' ').map(word => word.trim().replace(/[^a-z0-9]/ig, ''));
      return titleWords.some(titleWord => searchWords.includes(titleWord as string)) || descriptionWords.some(titleWord => searchWords.includes(titleWord as string));
    }).sort((a, b) => {
      const searchWords = keyword.trim().toLowerCase().split(' ').map(word => word.trim().replace(/[^a-z0-9]/ig, ''));
      const titleWords = a.title.trim().toLowerCase().split(' ').map(word => word.trim().replace(/[^a-z0-9]/ig, ''));
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


