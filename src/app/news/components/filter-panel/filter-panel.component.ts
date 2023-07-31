import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-filter-panel', 
    templateUrl: './filter-panel.component.html', 
    styleUrls: ['./filter-panel.component.sass'], 
})

export class FilterPanelComponent implements OnInit {
  @Input() result: number = 0
    // Змінні, властивості, методи і логіка компонента
    // ...
  
    constructor() {}
  
    ngOnInit(): void {
      // Логіка, що виконується при ініціалізації компонента
    }
  
    // Інші методи компонента, якщо необхідно
    // ...
  }
