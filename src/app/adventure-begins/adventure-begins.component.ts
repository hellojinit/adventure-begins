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
  message = 'Your adventure begins!! All good things come at a price. By playing this game you\'ll be wagering 3 points. If you successfully reach the final page, you\'ll gain 6 points. However, if you fail to reach the final page you\'ll forever lose those points. Good luck! Don\'t take this lightly, to solve these riddles you\'ll have to go to the source of it.';

  ngOnInit(): void {
    console.log("WELCOME TO THE SOURCE! To progress, change the URL to the answer of the below riddle.")
    console.log("I have keys, but open no locks. I have a staff, but no employees. I have a beat, but no heart.")
  }
}
