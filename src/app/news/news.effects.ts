import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, concatMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NewsService } from './news.service';
import * as NewsActions from './news.actions';

@Injectable()
export class NewsEffects {
  loadNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewsActions.loadNews),
      mergeMap(() =>
        this.newsService.getNews().pipe(
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


  constructor(private actions$: Actions, private newsService: NewsService) {}
}