import { Component, Input } from '@angular/core';
import { Article } from 'src/app/news/news.reducer';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent {
  @Input() data!: Article
  @Input() keyword!: string
  cardsIdsToHighlite: number[] = []

  truncateWord(string: string, maxLength: number, id?: number) {
    // оскільки всі заголовки і описи карток обрізаються до 100 символів, виникає ситуація, коли слово, яке ввів юзер, є в картці, але в повному, а не скороченому варіанті заголовку або опису. Відповідно, картка потрапить до фільтрованих, але жовтим кольором жодне слово виділено не буде. Тому, щоб юзер не вважав, що такого слова в цій картці немає і сталася помилка, виділяємо жовтим останнє слово картки, яке містить три крапки. Тобто, підказуємо юзеру, що фільтрація була правильною, просто потрібно відкрити повний текст опису на сторінці картки і там ключове слово є. Можна було б нічого не робити і залишити як є (не виділяючи жовтим нічого), але тоді не буде візуально зрозуміло, чому така картка взагалі потрапила у список відфітрованих (якщо в ній немає виділених жовтим слів). 
    if (this.keyword.length > 0) {
      const searchWords = this.keyword.trim().toLowerCase().split(' ').map(word => word.trim().replace(/[^a-z0-9]/ig, ''));
      const slicedStrAfter100 = string.slice(99)
      const titleWords = slicedStrAfter100.toLowerCase().split(' ').map(word => word.replace(/[^a-z0-9]/ig, ''));
      if (titleWords.some(titleWord => searchWords.includes(titleWord as string)) && id) {
        this.cardsIdsToHighlite.push(id)
      }
    }

    if (string.length > maxLength) {
      return string.slice(0, maxLength - 3) + '...'
    } else {
      return string
    }
  }

  highlightWord(word: string, id?: any) {
    if (this.keyword.length === 0) return
    // додаємо клас highlight для слова в картці із трьома крапками 
    if (this.cardsIdsToHighlite.indexOf(id) > -1 && word.endsWith('...') ) return word

    if (!/[a-zA-Z0-9]/.test(word)) {return}
    const searchWords = this.keyword.toLowerCase().split(' ').map(word => word.replace(/[^a-z0-9]/ig, ''));
    return searchWords.includes(word.replace(/[^a-z0-9]/ig, '').toLowerCase());
  }

}