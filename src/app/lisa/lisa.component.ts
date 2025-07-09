import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lisa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lisa.component.html',
  styleUrls: ['./lisa.component.css']
})
export class LisaComponent implements OnDestroy {
  showChallenge = false;
  timerStarted = false;
  timerValue = 60;
  userAnswer = '';
  timerInterval: any;
  questFailed = false;
  correctAnswer = "that's pretty good";
  correctAnswer2 = "thats pretty good";

  constructor(private router: Router) {}

  startChallenge(): void {
    this.showChallenge = true;
    this.timerStarted = true;
    this.startTimer();
  }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      if (this.timerValue > 0) {
        this.timerValue--;
      } else {
        this.timerExpired();
      }
    }, 1000);
  }

  timerExpired(): void {
    this.stopTimer();
    this.questFailed = true;
    this.showChallenge = false;
  }

  checkAnswer(): void {
    console.log(this.userAnswer.toLowerCase().trim());
    if (this.userAnswer.toLowerCase().trim() === this.correctAnswer || this.userAnswer.toLowerCase().trim() === this.correctAnswer2) {
      this.stopTimer();
      this.router.navigate(['/congrats']);
    }
  }

  stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerStarted = false;
    }
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }
}
