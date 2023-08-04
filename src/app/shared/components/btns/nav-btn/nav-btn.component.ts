import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-btn',
  templateUrl: './nav-btn.component.html',
  styleUrls: ['./nav-btn.component.sass']
})
export class NavBtnComponent {
  @Input() text: string = ''
  @Input() linkTo!: string
}