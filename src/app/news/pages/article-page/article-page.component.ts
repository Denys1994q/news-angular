import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StoreTypes } from '../../news.reducer';
import { loadArticle } from '../../news.actions';
import { Article } from '../../news.reducer';

@Component({
    selector: 'app-article-page', 
    templateUrl: './article-page.component.html', 
    styleUrls: ['./article-page.component.sass'], 
})
export class ArticlePageComponent implements OnInit {
    dynamicId!: string | null;
    article$!: Observable<Article | null>;
    loading$!: Observable<boolean>;
    error$!: Observable<any>;

    constructor(private route: ActivatedRoute, private store: Store<StoreTypes>) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.dynamicId = params.get('id');
        });
        if (this.dynamicId) {
            this.store.dispatch(loadArticle({ articleId: this.dynamicId }));
        }
        this.loading$ = this.store.select((state: StoreTypes) => state.news.articleLoading);
        this.error$ = this.store.select((state: StoreTypes) => state.news.articleError);
        this.article$ = this.store.select((state: StoreTypes) => state.news.article)
    }
}
