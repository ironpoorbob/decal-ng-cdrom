import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { Bio1Component } from './bio/bio1/bio1.component';
import { Bio2Component } from './bio/bio2/bio2.component';
import { Bio3Component } from './bio/bio3/bio3.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { Bio4Component } from './bio/bio4/bio4.component';
import { Profile1Component } from './bio/profile1/profile1.component';
import { Profile2Component } from './bio/profile2/profile2.component';
import { Profile3Component } from './bio/profile3/profile3.component';
import { Profile4Component } from './bio/profile4/profile4.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { Bio5Component } from './bio/bio5/bio5.component';
import { Bio6Component } from './bio/bio6/bio6.component';
import { UrlSanitizePipe } from './url-sanitize.pipe';

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
    OutroComponent,
    Bio1Component,
    Bio2Component,
    Bio3Component,
    Bio4Component,
    Profile1Component,
    Profile2Component,
    Profile3Component,
    Profile4Component,
    VideoPlayerComponent,
    Bio5Component,
    Bio6Component,
    UrlSanitizePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
