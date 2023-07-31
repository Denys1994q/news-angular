import { Component, Input } from '@angular/core';
import { OneNews } from 'src/app/news/news.reducer';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent {
 @Input() data!: OneNews
}