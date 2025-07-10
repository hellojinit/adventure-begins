import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Tile {
  id: number;
  imageUrl: string | null;
  row: number;
  col: number;
}

@Component({
  selector: 'app-sliding-puzzle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sliding-puzzle.component.html',
  styleUrls: ['./sliding-puzzle.component.css']
})
export class SlidingPuzzleComponent implements OnInit {
  tiles: Tile[] = [];
  isSolved = false; // New property to track the solved state of the puzzle.
  // The full image to be displayed when the puzzle is solved.
  // Make sure this image exists in your assets folder.
  solvedImageUrl = 'sky.png';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initializePuzzle();
    this.shufflePuzzle();
  }

  initializePuzzle(): void {
    this.tiles = [];
    this.isSolved = false; // Reset solved state on initialization

    // Create the 3x3 grid of tiles with images
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        this.tiles.push({
          id: row * 3 + col,
          imageUrl: `${row}${col}.png`,
          row: row,
          col: col
        });
      }
    }

    // Add the empty tiles.
    this.tiles.push({ id: 9, imageUrl: null, row: 2, col: 3 });
    this.tiles.push({ id: 10, imageUrl: null, row: 1, col: 3 });
  }

  shufflePuzzle(): void {
    const moves = 100;
    for (let i = 0; i < moves; i++) {
      const possibleMoves = this.getPossibleMoves();
      if (possibleMoves.length > 0) {
        const randomMoveIndex = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        this.moveTile(randomMoveIndex, true);
      }
    }
  }

  getEmptyTiles(): Tile[] {
    return this.tiles.filter(tile => tile.imageUrl === null);
  }

  getPossibleMoves(): number[] {
    const emptyTiles = this.getEmptyTiles();
    const movableTileIndices: number[] = [];
    this.tiles.forEach((tile, index) => {
      if (tile.imageUrl === null) return;
      const isMovable = emptyTiles.some(emptyTile =>
        (tile.row === emptyTile.row && Math.abs(tile.col - emptyTile.col) === 1) ||
        (tile.col === emptyTile.col && Math.abs(tile.row - emptyTile.row) === 1)
      );
      if (isMovable) {
        movableTileIndices.push(index);
      }
    });
    return movableTileIndices;
  }

  canMoveTile(index: number): boolean {
    const tile = this.tiles[index];
    if (tile.imageUrl === null) return false;
    const emptyTiles = this.getEmptyTiles();
    return emptyTiles.some(emptyTile =>
      (tile.row === emptyTile.row && Math.abs(tile.col - emptyTile.col) === 1) ||
      (tile.col === emptyTile.col && Math.abs(tile.row - emptyTile.row) === 1)
    );
  }

  moveTile(index: number, isShuffle: boolean = false): void {
    if (!isShuffle && !this.canMoveTile(index)) {
      return;
    }

    const clickedTile = this.tiles[index];
    const adjacentEmptyTile = this.getEmptyTiles().find(emptyTile =>
      (clickedTile.row === emptyTile.row && Math.abs(clickedTile.col - emptyTile.col) === 1) ||
      (clickedTile.col === emptyTile.col && Math.abs(clickedTile.row - emptyTile.row) === 1)
    );

    if (adjacentEmptyTile) {
      const tempRow = clickedTile.row;
      const tempCol = clickedTile.col;
      clickedTile.row = adjacentEmptyTile.row;
      clickedTile.col = adjacentEmptyTile.col;
      adjacentEmptyTile.row = tempRow;
      adjacentEmptyTile.col = tempCol;

      // After a user's move, check if the puzzle is solved.
      if (!isShuffle) {
        this.checkIfSolved();
      }
    }
  }

  /**
   * Checks if all tiles are in their correct, original positions.
   */
  checkIfSolved(): void {
    // The puzzle is solved if every tile is in the position defined by its ID.
    for (const tile of this.tiles) {
      if (tile.imageUrl !== null) { // We only check the image tiles, not the empty spaces.
        const correctRow = Math.floor(tile.id / 3);
        const correctCol = tile.id % 3;
        if (tile.row !== correctRow || tile.col !== correctCol) {
          this.isSolved = false;
          return; // Found a misplaced tile, so it's not solved.
        }
      }
    }

    // If the loop completes, all tiles are in the correct place.
    this.isSolved = true;
  }

  getTileStyle(tile: Tile): object {
    return {
      'grid-row': `${tile.row + 1}`,
      'grid-column': `${tile.col + 1}`
    };
  }

  navigateToFriends(): void {
    this.router.navigate(['/friends']);
  }
}
