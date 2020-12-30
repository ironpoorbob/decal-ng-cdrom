import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BottonHsComponent } from './botton-hs/botton-hs.component';
import { IntroComponent } from './intro/intro.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { AskComponent } from './ask/ask.component';
import { BioComponent } from './bio/bio.component';
import { CreditsComponent } from './credits/credits.component';
import { OutroComponent } from './outro/outro.component';

@NgModule({
  declarations: [
    AppComponent,
    BottonHsComponent,
    IntroComponent,
    HomeComponent,
    GameComponent,
    AskComponent,
    BioComponent,
    CreditsComponent,
    OutroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
