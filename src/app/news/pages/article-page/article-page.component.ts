import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { NewsState } from '../../news.reducer';
import { filterNews, loadNews } from '../../news.actions';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
    selector: 'app-article-page', 
    templateUrl: './article-page.component.html', 
    styleUrls: ['./article-page.component.sass'], 
})
export class ArticlePageComponent implements OnInit {

    ngOnInit(): void {
        
    }
}
