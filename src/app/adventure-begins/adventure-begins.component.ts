import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adventure-begins',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adventure-begins.component.html',
  styleUrls: ['./adventure-begins.component.css']
})
export class AdventureBeginsComponent {
  message = 'Welcome, CUCUB!! All good things come with a price. By playing this game, you\'ll be wagering 3 points. If you successfully reach the final page, you shall be rewarded with 6 glorious points! Fail, and you\'ll lose those points forever. Good luck!';

  ngOnInit(): void {
    console.log("WELCOME TO THE SOURCE! To progress, change the URL to the answer of the below riddle.")
    console.log("I have keys, but open no locks. I have a staff, but no employees. I have a beat, but no heart.")
  }
}
