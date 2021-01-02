import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, ReplaySubject } from 'rxjs';
import { StateManagerService } from '../state-manager.service';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent implements OnInit, OnDestroy {

  public loopAudio: any;

  public dataObjSubscription: Subscription;
  public dataObj: any; // data received

  constructor(
    private stateManagerService: StateManagerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.playAudio(false);
    this.dataObjSubscription = this.stateManagerService.$dataObj.subscribe(
      value => {
        this.dataObj = value;
        // console.log('object state in button: ', value);
      }
    )
  }

  public ngOnDestroy(): void {
    this.dataObjSubscription.unsubscribe();
  }

  public handleMenuClick() {
    // this.loopAudio.pause();
    this.router.navigateByUrl('/home');
    this.stateManagerService.stopLoop();
  }

  public playAudio(muted): void {
    // this.loopAudio = new Audio();
    // this.loopAudio.src = "assets/audio/cocktails1.mono.22.mp3";
    // this.loopAudio.muted = muted;
    // this.loopAudio.load();
    // console.log('play audio: ', this.loopAudio.muted);
    // if (muted === false) {
    //   this.loopAudio.play();
    // }

    // this.loopAudio.loop = true;
  }

}
