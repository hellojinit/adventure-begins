import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordleService } from './wordle.service';

@Component({
  selector: 'app-wordle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.css']
})
export class WordleComponent implements OnInit {
  rows: { letter: string; status: 'correct' | 'present' | 'absent' | 'empty' }[][] = [];
  currentRow = 0;
  currentCol = 0;
  gameStatus: 'playing' | 'won' | 'lost' = 'playing';
  message = '';
  keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace']
  ];
  keyboardStatus: { [key: string]: 'correct' | 'present' | 'absent' | '' } = {};

  constructor(private wordleService: WordleService) {}

  ngOnInit(): void {
    this.initializeGame();
  }

  initializeGame(): void {
    // Initialize 6 rows with 5 columns each
    this.rows = Array(6).fill(null).map(() =>
      Array(5).fill(null).map(() => ({ letter: '', status: 'empty' }))
    );
    this.currentRow = 0;
    this.currentCol = 0;
    this.gameStatus = 'playing';
    this.message = '';
    this.keyboardStatus = {};
    this.wordleService.selectRandomWord();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (this.gameStatus !== 'playing') return;

    if (event.key === 'Enter') {
      this.submitGuess();
    } else if (event.key === 'Backspace') {
      this.deleteLetter();
    } else if (/^[a-zA-Z]$/.test(event.key) && this.currentCol < 5) {
      this.addLetter(event.key.toUpperCase());
    }
  }

  handleKeyClick(key: string): void {
    if (this.gameStatus !== 'playing') return;

    if (key === 'Enter') {
      this.submitGuess();
    } else if (key === 'Backspace') {
      this.deleteLetter();
    } else if (/^[A-Z]$/.test(key) && this.currentCol < 5) {
      this.addLetter(key);
    }
  }

  addLetter(letter: string): void {
    if (this.currentCol < 5) {
      this.rows[this.currentRow][this.currentCol].letter = letter;
      this.currentCol++;
    }
  }

  deleteLetter(): void {
    if (this.currentCol > 0) {
      this.currentCol--;
      this.rows[this.currentRow][this.currentCol].letter = '';
    }
  }

  submitGuess(): void {
    if (this.currentCol !== 5) {
      this.showMessage('Not enough letters');
      return;
    }

    const currentWord = this.rows[this.currentRow].map(cell => cell.letter).join('');

    if (!this.wordleService.isValidWord(currentWord)) {
      this.showMessage('Not in word list');
      return;
    }

    const result = this.wordleService.checkGuess(currentWord);

    // Update cell statuses based on result
    for (let i = 0; i < 5; i++) {
      this.rows[this.currentRow][i].status = result[i];

      // Update keyboard status - only upgrade status (absent -> present -> correct)
      const letter = this.rows[this.currentRow][i].letter;
      if (!this.keyboardStatus[letter] ||
          (this.keyboardStatus[letter] === 'absent' && result[i] !== 'absent') ||
          (this.keyboardStatus[letter] === 'present' && result[i] === 'correct')) {
        this.keyboardStatus[letter] = result[i];
      }
    }

    // Check if player won
    if (result.every(status => status === 'correct')) {
      this.gameStatus = 'won';
      this.showMessage('Congratulations!');
      return;
    }

    // Move to next row or end game
    this.currentRow++;
    this.currentCol = 0;

    if (this.currentRow >= 6) {
      this.gameStatus = 'lost';
      this.showMessage(`Game over! The word was ${this.wordleService.getCurrentWord()}`);
    }
  }

  showMessage(msg: string): void {
    this.message = msg;
    setTimeout(() => this.message = '', 2000);
  }

  resetGame(): void {
    this.initializeGame();
  }

  getKeyboardCellClass(key: string): string {
    return this.keyboardStatus[key] || '';
  }
}
