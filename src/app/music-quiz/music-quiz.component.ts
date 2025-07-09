import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-music-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './music-quiz.component.html',
  styleUrls: ['./music-quiz.component.css']
})
export class MusicQuizComponent {
  answers = {
    question1: '',
    question2: '',
    question3: ''
  };

  message = '';
  showMessage = false;

  // Correct answers for the quiz
  private correctAnswers = {
    question1: 'december',
    question2: 'Friends',
    question3: 'Die'
  };

  constructor(private router: Router) {}

  submitAnswers(): void {
    if (this.checkAnswers()) {
      this.message = 'Eeeezzzzz, GREAT JOB!!🎉 Your quest continues...';
      this.showMessage = true;

      // Navigate to adventure-begins after a short delay
      setTimeout(() => {
        this.router.navigate(['/slide']);
      }, 3000);
    } else {
      this.message = 'Sorry, one or more answers are incorrect. You\'ve permanently lost a point :(. Try again!';
      this.showMessage = true;

      this.answers.question1 = ''
      this.answers.question2 = ''
      this.answers.question3 = ''

      // Hide message after 3 seconds
      setTimeout(() => {
        this.showMessage = false;
      }, 3000);
    }
  }

  private checkAnswers(): boolean {
    return (
      this.answers.question1.trim().toLowerCase() === this.correctAnswers.question1.toLowerCase() &&
      this.answers.question2.trim().toLowerCase() === this.correctAnswers.question2.toLowerCase() &&
      this.answers.question3.trim().toLowerCase() === this.correctAnswers.question3.toLowerCase()
    );
  }
}
