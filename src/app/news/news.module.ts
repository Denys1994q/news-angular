import { NgModule } from '@angular/core';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { ArticlePageComponent } from './pages/article-page/article-page.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NewsPageComponent,
    ArticlePageComponent,
    FilterPanelComponent
  ],
  imports: [
    SharedModule
  ], 
  exports: [
  ]
})
export class NewsModule { }