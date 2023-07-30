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

@NgModule({
  declarations: [
    SearchInputComponent,
    CardComponent
  ],
  imports: [
    CommonModule, 
    MatIconModule, 
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    AppRoutingModule,
  ],
  exports: [
    CommonModule,
    AppRoutingModule,
    MatIconModule, 
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    SearchInputComponent,
    CardComponent
  ]
})
export class SharedModule { }