import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { NewsState } from '../../news.reducer';
import { filterNews, loadNews } from '../../news.actions';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { StoreTypes } from '../news-page/news-page.component';
import { loadArticle } from '../../news.actions';

@Component({
    selector: 'app-article-page', 
    templateUrl: './article-page.component.html', 
    styleUrls: ['./article-page.component.sass'], 
})
export class ArticlePageComponent implements OnInit {
    dynamicId!: any;
    article$!: Observable<any>;
    loading$!: Observable<any>;
    error$!: Observable<any>;

    constructor(private route: ActivatedRoute, private store: Store<StoreTypes>) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.dynamicId = params.get('id');
        });
        this.store.dispatch(loadArticle({ articleId: this.dynamicId }));
        this.loading$ = this.store.select((state: StoreTypes) => state.news.loading);
        this.error$ = this.store.select((state: StoreTypes) => state.news.error);
        this.article$ = this.store.select((state: StoreTypes) => state.news.article)
    }
}
