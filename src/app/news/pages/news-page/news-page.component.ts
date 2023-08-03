import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { NewsState } from '../../news.reducer';
import { filterNews, loadNews } from '../../news.actions';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

export interface StoreTypes {
  news: NewsState
}

@Component({
    selector: 'app-news-page', 
    templateUrl: './news-page.component.html', 
    styleUrls: ['./news-page.component.sass'], 
})
export class NewsPageComponent implements OnInit, AfterViewInit {
    // список новин, який показується у верстці 
    filteredNews$!: Observable<any[]>;
    // завантаження
    loading$!: Observable<any>;
    // помилка при завантаженні
    error$!: Observable<any>;
    length!: any
    // значення інпуту для пошуку
    keyword: string = ''
    // для штучної затримки при роботі інпута (оскільки працює на кожен символ)
    private searchSubject = new Subject<string>();
    private debounceTimeMs = 300; 
    // для скролу 
    private firstTimeScroll = true;

    constructor(private store: Store<StoreTypes>) {}

    // відслідковуємо чи блок intersectionTrigger в зоні видимості юзера (чи юзер вже доскролив)
    @ViewChild('intersectionTrigger', { static: false }) intersectionTrigger!: ElementRef<HTMLDivElement>;
  
    ngAfterViewInit() {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !this.firstTimeScroll) {
          // завантажуємо додаткові новини, якщо юзер доскролив до останньої картки
          // при першому завантаженні сторінки не виконуємо зайвий loadNews, контролюємо через змінну firstTimeScroll
          // не завантажуємо додаткові новини при працюючій фільтрації
          if (this.keyword.length > 0) {return}
          this.store.dispatch(loadNews());
        }
        this.firstTimeScroll = false;
      });
      observer.observe(this.intersectionTrigger.nativeElement);
    }

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
