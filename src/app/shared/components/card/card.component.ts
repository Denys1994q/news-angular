import { Component, Input } from '@angular/core';
import { OneNews } from 'src/app/news/news.reducer';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent {
 @Input() data!: OneNews
 @Input() keyword!: string

 highlightWord(word: string) {
  if (word === '—') {return}
  const searchWords = this.keyword.toLowerCase().split(' ').map(word => word.replace(/[^a-z0-9]/ig, ''));
  return searchWords.includes(word.replace(/[^a-z0-9]/ig, '').toLowerCase());
 }
}