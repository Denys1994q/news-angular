import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-filter-panel', 
    templateUrl: './filter-panel.component.html', 
    styleUrls: ['./filter-panel.component.sass'], 
})

export class FilterPanelComponent implements OnInit {
  @Input() result: number = 0
  @Output() FilterPanelChange: EventEmitter<string> = new EventEmitter<string>();
 
  constructor() {}
  
    ngOnInit(): void {      
    }

    onSearchInputChange(inpValue: string) {
      this.FilterPanelChange.emit(inpValue)
    }


  }
