import { Component, EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.sass']
})
export class SearchInputComponent {
  searchInpValue: string = ''
  @Output() searchInputChange: EventEmitter<string> = new EventEmitter<string>();

  emitData() {
    this.searchInputChange.emit(this.searchInpValue);
  }

  resetValue() {
    this.searchInpValue = ''
    this.searchInputChange.emit(this.searchInpValue);
  }
 
}