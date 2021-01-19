import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, ReplaySubject } from 'rxjs';
import { StateManagerService } from '../state-manager.service';

interface FistComponentData {
  name: string;
  headline: string;
  url: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public dataObjSubscription: Subscription;
  public dataObj: any; // data received

  public audioElement: any;

  public loopAudio: any;

  fistData: Array<FistComponentData> = [
    {
      name: 'chris',
      headline: 'WHO WANTS<br> TO KNOW?',
      url: ''
    },
    {
      name: 'stark',
      headline: 'ASK THE BAND',
      url: ''
    },
    {
      name: 'bob',
      headline: 'DECAL<br> BOARD GAME',
      url: ''
    },
  ];

  constructor(
    private stateManagerService: StateManagerService,
    private router: Router
    ) { }

  ngOnInit(): void {
    // this.dataObj['hpButton0'] = false;
    // this.dataObj['hpButton1'] = false;
    // this.dataObj['hpButton2'] = false;

    this.dataObjSubscription = this.stateManagerService.$dataObj.subscribe(
      value => {
        this.dataObj = value;
        // console.log('button state :::::::::::::::::::::: ', this.dataObj);
        // console.log('object state in button: ', value);
      }
    )

    this.stateManagerService.getDataObj();

    this.fistData[0].url = this.dataObj.baseUrl + 'assets/images/fist-of-chris-c.png';
    this.fistData[1].url = this.dataObj.baseUrl + 'assets/images/fist-of-chris-s.png';
    this.fistData[2].url = this.dataObj.baseUrl + 'assets/images/fist-of-bob.png';

    // this.audioElement = document.createElement('audio');
    // this.audioElement.setAttribute('src', '/assets/audio/cocktails3.mono.22.aif');
    // this.audioElement.setAttribute('autoplay', 'autoplay');
    // // this.audioElement.Play(); 

    // this.audioElement.addEventListener('ended', function() {
    //   this.currentTime = 0;
    //   this.play();
    // }, false);

    // this.audioElement = new Audio('/assets/audio/cocktails3.mono.22.aif'); 
    // this.audioElement.addEventListener('ended', function() {
    //     this.currentTime = 0;
    //     this.play();
    // }, false);
    // this.audioElement.play();

    
    this.playAudio(false);
  }

  public ngOnDestroy(): void {
    this.dataObjSubscription.unsubscribe();
  }

  // public stopAudio() {
  //   this.loopAudio.pause();
  // }

  public playAudio(muted): void {

    this.stateManagerService.startLoop('home');
    
    // this.loopAudio = new Audio();
    // this.loopAudio.src = "assets/audio/crabs.mono.22.mp3";
    // this.loopAudio.muted = muted;
    // this.loopAudio.load();
    // console.log('play audio: ', this.loopAudio.muted);
    // if (muted === false) {
    //   this.loopAudio.play();
    // }

    // this.loopAudio.loop = true;

    // audio.addEventListener('ended', function() {
    //       this.currentTime = 0;
    //       audio.play();
    //   }, false);
  }

  public handleCreditsClick() {
    let audio;
    let audio2;
   
    audio = new Audio("assets/audio/hits/fist2-hit.mp3");
    audio2 = new Audio('assets/audio/hits/bodyHit2.mp3');
       
    audio.play();
    audio2.play();

    // this.loopAudio.pause();

    this.stateManagerService.stopLoop();
    this.stateManagerService.startLoop('credits');

    this.router.navigateByUrl('/credits');

  }
  

}
