import { Component } from '@angular/core';
import { Board } from '../../components/board/board';

@Component({
  selector: 'app-home',
  imports: [Board],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
