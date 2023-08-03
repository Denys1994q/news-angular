import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getNews(offset: number): Observable<any[]> {
    const apiUrl = `https://api.spaceflightnewsapi.net/v4/articles/?limit=10&offset=${offset}`;
    return this.http.get<any>(apiUrl);
  }

  getArticle(id: any): Observable<any[]> {
    const apiArticleUrl = `https://api.spaceflightnewsapi.net/v4/articles/${id}`;
    return this.http.get<any>(apiArticleUrl);
  }
}
