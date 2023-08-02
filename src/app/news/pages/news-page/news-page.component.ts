import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { NewsState } from '../../news.reducer';
import { filterNews, loadNews } from '../../news.actions';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

interface StoreTypes {
  news: NewsState
}

@Component({
    selector: 'app-news-page', 
    templateUrl: './news-page.component.html', 
    styleUrls: ['./news-page.component.sass'], 
})
export class NewsPageComponent implements OnInit {
    filteredNews$!: Observable<any[]>;
    loading$!: Observable<any>;
    error$!: Observable<any>;
    length!: any
    keyword: string = ''
    private searchSubject = new Subject<string>();
    private debounceTimeMs = 300; 

    constructor(private store: Store<StoreTypes>) {}
  
    ngOnInit(): void {
      // завантажуємо дані з серверу
      this.store.dispatch(loadNews());
      // статус: завантаження
      this.loading$ = this.store.select((state: StoreTypes) => state.news.loading);
      // статус: помилка
      this.error$ = this.store.select((state: StoreTypes) => state.news.error);
      // підписуємо на зміни в списку всіх новин, які приходять з серверу - newsAll
      this.store.select((state) => state.news.newsAll).subscribe((news) => {
        // якщо список новин із серверу успішно отримано, записуємо початково ці новини у список відфільтрованих, які й показуються юзеру
        if (news.length > 0) {
          this.store.dispatch(filterNews({ keyword: '' })); 
        }
      });
      // список відфільтрованих новин
      this.filteredNews$ = this.store.select((state: StoreTypes) => state.news.filteredNews)
      this.filteredNews$.subscribe((newsItems) => {
        this.length = newsItems.length; 
      });

      this.searchSubject.pipe(
        debounceTime(this.debounceTimeMs),
        distinctUntilChanged()
      ).subscribe((keyword) => {
        this.store.dispatch(filterNews({ keyword: keyword }));
      });
    }

    onFilterPanelChange(inpValue: string) {
      this.keyword = inpValue
      this.searchSubject.next(inpValue);
    }
}
