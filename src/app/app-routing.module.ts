import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroComponent } from '../app/intro/intro.component';
import { HomeComponent } from '../app/home/home.component';
import { GameComponent } from '../app/game/game.component';
import { AskComponent } from '../app/ask/ask.component';
import { BioComponent } from '../app/bio/bio.component';
import { CreditsComponent } from '../app/credits/credits.component';
import { OutroComponent } from '../app/outro/outro.component';

const routes: Routes = [
  { path: 'intro', component: IntroComponent },
  { path: 'home', component: HomeComponent },
  { path: 'game', component: GameComponent },
  { path: 'ask', component: AskComponent },
  { path: 'bio', component: BioComponent },
  { path: 'credits', component: CreditsComponent },
  { path: 'outro', component: OutroComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
