// news.actions.ts

import { createAction, props } from '@ngrx/store';

export const loadNews = createAction('[News] Load News');
export const loadNewsSuccess = createAction('[News] Load News Success', props<{ news: any }>());
export const loadNewsFailure = createAction('[News] Load News Failure', props<{ error: any }>());
export const filterNews = createAction('[News] Filter News', props<{ keyword: string }>());