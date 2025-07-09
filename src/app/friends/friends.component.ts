import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent {
  answers = {
    episode1: '1',
    episode2: '',
    episode3: '',
    episode4: '',
    episode5: ''
  };

  message = '';
  showMessage = false;
  youtubeUrl = 'https://www.youtube.com/watch?v=RjpvuPAzJUw';

  // Correct answers - to be updated later
  private correctAnswers = {
    episode1: '1',
    episode2: '5',
    episode3: '2',
    episode4: '4',
    episode5: '3'
  };

  constructor(private router: Router) {}

  submitAnswers(): void {
    if (this.checkAnswers()) {
      this.message = 'Correct!!🎉 Off you go Dobby...';
      this.showMessage = true;

      // Navigate to adventure-begins after a short delay
      setTimeout(() => {
        this.router.navigate(['/adventure-begins']);
      }, 4000);
    } else {
      this.message = 'Aiyoooo, one or more answers are incorrect. You\'ve permanently lost a point :(. Try again!';
      this.showMessage = true;

      // Clear answers
      this.answers = {
        episode1: '',
        episode2: '',
        episode3: '',
        episode4: '',
        episode5: ''
      };

      // Hide message after 3 seconds
      setTimeout(() => {
        this.showMessage = false;
      }, 5000);
    }
  }

  private checkAnswers(): boolean {
    return (
      this.answers.episode1.trim().toLowerCase() === this.correctAnswers.episode1.toLowerCase() &&
      this.answers.episode2.trim().toLowerCase() === this.correctAnswers.episode2.toLowerCase() &&
      this.answers.episode3.trim().toLowerCase() === this.correctAnswers.episode3.toLowerCase() &&
      this.answers.episode4.trim().toLowerCase() === this.correctAnswers.episode4.toLowerCase() &&
      this.answers.episode5.trim().toLowerCase() === this.correctAnswers.episode5.toLowerCase()
    );
  }
}
