import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import {SearchInputComponent} from './components/inputs/search-input/search-input.component'
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {CardComponent} from './components/card/card.component'
import { NavBtnComponent } from './components/btns/nav-btn/nav-btn.component';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    SearchInputComponent,
    CardComponent,
    NavBtnComponent
  ],
  imports: [
    CommonModule, 
    HttpClientModule,
    MatIconModule, 
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
  ],
  providers: [DatePipe],
  exports: [
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    MatIconModule, 
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    SearchInputComponent,
    MatProgressSpinnerModule,
    CardComponent,
    NavBtnComponent
  ]
})
export class SharedModule { }