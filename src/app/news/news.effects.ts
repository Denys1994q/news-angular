import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, withLatestFrom, map, concatMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NewsService } from './news.service';
import * as NewsActions from './news.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class NewsEffects {
  constructor(private actions$: Actions, private newsService: NewsService, private store: Store) {}

  loadNews$ = createEffect(() =>
  this.actions$.pipe(
    ofType(NewsActions.loadNews),
    withLatestFrom(this.store.select((state: any) => state.news.offset)), 
    mergeMap(([action, offset]) =>
      this.newsService.getNews(offset).pipe( 
        map((news) => NewsActions.loadNewsSuccess({ news })),
        catchError((error) => of(NewsActions.loadNewsFailure({ error })))
      )
    )
  )
);

  loadArticle$ = createEffect(() =>
  this.actions$.pipe(
    ofType(NewsActions.loadArticle),
    concatMap((action) =>
      this.newsService.getArticle(action.articleId).pipe(
        map((article) => NewsActions.loadArticleSuccess({ article })),
        catchError((error) => of(NewsActions.loadArticleFailure({ error })))
      )
    )
  )
);
}