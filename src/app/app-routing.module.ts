import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroComponent } from '../app/intro/intro.component';
import { HomeComponent } from '../app/home/home.component';
import { GameComponent } from '../app/game/game.component';
import { AskComponent } from '../app/ask/ask.component';
import { BioComponent } from '../app/bio/bio.component';
import { Bio1Component } from '../app/bio/bio1/bio1.component';
import { Bio2Component } from '../app/bio/bio2/bio2.component';
import { Bio3Component } from '../app/bio/bio3/bio3.component';
import { Bio4Component } from '../app/bio/bio4/bio4.component';
import { Bio5Component } from '../app/bio/bio5/bio5.component';
import { Bio6Component } from '../app/bio/bio6/bio6.component';
import { Profile1Component } from '../app/bio/profile1/profile1.component';
import { Profile2Component } from '../app/bio/profile2/profile2.component';
import { Profile3Component } from '../app/bio/profile3/profile3.component';
import { Profile4Component } from '../app/bio/profile4/profile4.component';
import { CreditsComponent } from '../app/credits/credits.component';
import { OutroComponent } from '../app/outro/outro.component';

import { StateManagerService } from '../app/state-manager.service';

const routes: Routes = [
  { path: 'intro', component: IntroComponent },
  { path: 'home', component: HomeComponent },
  { path: 'game', component: GameComponent },
  { path: 'ask', component: AskComponent },
  { path: 'bio', redirectTo: '/bio/bio1', pathMatch: 'full' },
  { path: 'bio', component: BioComponent,
    children: [
      { path: 'bio1', component: Bio1Component},
      { path: 'bio2', component: Bio2Component},
      { path: 'bio3', component: Bio3Component},
      { path: 'bio4', component: Bio4Component},
      { path: 'bio5', component: Bio5Component},
      { path: 'bio6', component: Bio6Component},
      { path: 'profile1', component: Profile1Component},
      { path: 'profile2', component: Profile2Component},
      { path: 'profile3', component: Profile3Component},
      { path: 'profile4', component: Profile4Component},
    ]
  },
  { path: 'credits', component: CreditsComponent },
  { path: 'outro', component: OutroComponent },
  { path: '**', redirectTo: '/intro' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor() {}
}
