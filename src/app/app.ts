import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WordleComponent } from './wordle/wordle.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WordleComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Wordle Clone';
}
