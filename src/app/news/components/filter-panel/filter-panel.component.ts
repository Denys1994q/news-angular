import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-filter-panel', 
    templateUrl: './filter-panel.component.html', 
    styleUrls: ['./filter-panel.component.sass'], 
})

export class FilterPanelComponent {
  @Input() result: number = 0
  @Output() FilterPanelChange: EventEmitter<string> = new EventEmitter<string>();
 
  onSearchInputChange(inpValue: string) {
    this.FilterPanelChange.emit(inpValue)
  }

}
