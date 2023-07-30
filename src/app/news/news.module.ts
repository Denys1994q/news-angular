import { NgModule } from '@angular/core';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';

@NgModule({
  declarations: [
    NewsPageComponent,
    FilterPanelComponent
  ],
  imports: [
  ], 
  exports: [
  ]
})
export class NewsModule { }