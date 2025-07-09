import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-congratulations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './congratulations.component.html',
  styleUrls: ['./congratulations.component.css']
})
export class CongratulationsComponent {
  // Expanded emoji set including BLACKPINK, money, hearts, music, and ice cream
  emojis = [
    '💰', '💵', '💸', '✨', '💸', '✨', '🖤', '💓', '🍦', '💄', '🔪', '💓', '💵',
    '🖤', '💗', '🔪', '❤️‍🔥', '🍦', '🍧', '🎵', '🎼', '🎤', '🎧', '🎹', '💞', '💝',
    '🖤', '💗', '🔪', '❤️‍🔥', '🍦', '🍧', '🎵',
    '🎸', '🪩', '✨', '💵', '👠', '💓', '🖤', '🍦', '🌠', '🍦', '💵', '🖤', '💓'
  ];

  // Get random position for emoji animation with wider distribution
  getRandomPosition(i: number): string {
    const left = (Math.random() * 95 + 2) + '%';
    const top = (Math.random() * 95 + 2) + '%';
    const delay = (i * 0.2) % 3 + 's';
    const duration = (Math.random() * 8 + 5) + 's';
    const size = (Math.random() * 1.5 + 1) + 'rem';

    return `left: ${left}; top: ${top}; animation-delay: ${delay}; animation-duration: ${duration}; font-size: ${size};`;
  }
}
