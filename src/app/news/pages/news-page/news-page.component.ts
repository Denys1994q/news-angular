import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NewsState } from '../../news.reducer';
import { filterNews, loadNews } from '../../news.actions';

interface StoreTypes {
  news: NewsState
}

@Component({
    selector: 'app-news-page', 
    templateUrl: './news-page.component.html', 
    styleUrls: ['./news-page.component.sass'], 
})
export class NewsPageComponent implements OnInit {
    // newsItems$!: Observable<any[]>;
    filteredNews$!: Observable<any[]>;
    loading$!: Observable<any>;
    error$!: Observable<any>;
    length!: any

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
          this.store.dispatch(filterNews({ keyword: 'untry' })); // Диспатчимо фільтрацію після успішного завантаження новин
        }
      });

      this.filteredNews$ = this.store.select((state: StoreTypes) => state.news.filteredNews)
      
      // this.filteredNews$.subscribe((newsItems) => {
      //   this.length = newsItems.length; 
      //   this.store.dispatch(filterNews({keyword: 'dsa'}));
      // });

      // this.newsItems$ = this.store.select((state: StoreTypes) => state.news.newsAll)

      // this.newsItems$.subscribe((newsItems) => {
        // this.length = newsItems.length; 
        // this.store.dispatch(filterNews({keyword: 'dsa'}));
      // });
    }
}
