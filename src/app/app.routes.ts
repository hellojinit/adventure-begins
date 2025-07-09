import { Routes } from '@angular/router';
import { WordleComponent } from './wordle/wordle.component';
import { AdventureBeginsComponent } from './adventure-begins/adventure-begins.component';
import { MusicQuizComponent } from './music-quiz/music-quiz.component';
import { FriendsComponent } from './friends/friends.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: WordleComponent },
  { path: 'adventure-begins', component: AdventureBeginsComponent },
  { path: 'music', component: MusicQuizComponent },
  { path: 'song', component: MusicQuizComponent },
  { path: 'friends', component: FriendsComponent },
  { path: '**', component: NotFoundComponent }
];
