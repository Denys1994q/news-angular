import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsPageComponent } from './news/pages/news-page/news-page.component';
import { ArticlePageComponent } from './news/pages/article-page/article-page.component';

// сторінку помилки 
const routes: Routes = [
  {
    path: '',
    component: NewsPageComponent,
  },
  {
    path: ':id',
    component: ArticlePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
