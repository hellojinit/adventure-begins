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
  emptyTileIndex: number = 9; // Starting with empty tile at bottom right

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initializePuzzle();
    this.shufflePuzzle();
  }

  initializePuzzle(): void {
    this.tiles = [];

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

    // Add the empty tile (position 3,3 or bottom right in our 3x3 grid extended to 3x4)
    this.tiles.push({
      id: 9,
      imageUrl: null,
      row: 2,
      col: 3
    });
  }

  shufflePuzzle(): void {
    // Start with a solved puzzle and make a series of valid moves to shuffle
    const moves = 100;
    for (let i = 0; i < moves; i++) {
      const possibleMoves = this.getPossibleMoves();
      if (possibleMoves.length > 0) {
        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        this.moveTile(randomMove);
      }
    }
  }

  getPossibleMoves(): number[] {
    const emptyTile = this.tiles[this.emptyTileIndex];
    const movableTiles: number[] = [];

    // Check all tiles to find adjacent ones
    this.tiles.forEach((tile, index) => {
      // A tile can move if it's horizontally or vertically adjacent to the empty tile
      if (
        (tile.row === emptyTile.row && Math.abs(tile.col - emptyTile.col) === 1) ||
        (tile.col === emptyTile.col && Math.abs(tile.row - emptyTile.row) === 1)
      ) {
        movableTiles.push(index);
      }
    });

    return movableTiles;
  }

  canMoveTile(index: number): boolean {
    const tile = this.tiles[index];
    const emptyTile = this.tiles[this.emptyTileIndex];

    // A tile can move if it's horizontally or vertically adjacent to the empty tile
    return (
      (tile.row === emptyTile.row && Math.abs(tile.col - emptyTile.col) === 1) ||
      (tile.col === emptyTile.col && Math.abs(tile.row - emptyTile.row) === 1)
    );
  }

  moveTile(index: number): void {
    if (this.canMoveTile(index)) {
      const emptyTile = this.tiles[this.emptyTileIndex];
      const clickedTile = this.tiles[index];

      // Swap positions
      const tempRow = clickedTile.row;
      const tempCol = clickedTile.col;

      clickedTile.row = emptyTile.row;
      clickedTile.col = emptyTile.col;

      emptyTile.row = tempRow;
      emptyTile.col = tempCol;
    }
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
