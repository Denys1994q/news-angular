import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from './news.reducer';

export interface NewsResponse {
  count: number,
  next: string,
  previous: string | null,
  results: Article[]
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getNews(offset: number): Observable<NewsResponse> {
    const apiUrl = `https://api.spaceflightnewsapi.net/v4/articles/?limit=10&offset=${offset}`;
    return this.http.get<NewsResponse>(apiUrl);
  }

  getArticle(id: string): Observable<Article> {
    const apiArticleUrl = `https://api.spaceflightnewsapi.net/v4/articles/${id}`;
    return this.http.get<Article>(apiArticleUrl);
  }
}
