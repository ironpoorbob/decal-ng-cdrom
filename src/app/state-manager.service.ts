import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';

import { StateManagerInterface } from './state-manager-interface';

@Injectable({
  providedIn: 'root'
})
export class StateManagerService {

  public audio: any;

  private dataObjSource = new ReplaySubject<any>();
  public $dataObj = this.dataObjSource.asObservable();

  public dataObj: StateManagerInterface = {
    hpButton0: false,
    hpButton1: false,
    hpButton2: false,
    loop: '',
    baseUrl: ''
  }

  constructor() { }

  public getDataObj() {
    // console.log('the object ================ ', this.dataObj);
    this.dataObjSource.next(this.dataObj);
  }

  public setValue(key, value) {
    // console.log('set value : key : ', key, ' : value : ', value);
    this.dataObj[key] = value;
    // console.log('set data: ', this.dataObj);
    // console.log('the count : ', this.dataObj.count);
    this.getDataObj();
  }



  // start and stop audio loops
  // current loop name var

  public startLoop(loop): void {
    // home crabs.mono.22.mp3
    // credits  cocktails1.mono.22.mp3
    // ask/videos cocktails3.mono.22.mp3
    // game figure1.mono.22.mp3
    // bio slide1  grind1.mono.mp3
    // bio slide2  grind 2.mono.22.mp3
    // bio slide3  grind3.mono.mp3

    // let audio;
    let waitTime = undefined;

    this.dataObj['loop'] = loop;
    // console.log('start loop:::: ', loop, ' ::: ', this.dataObj);
    switch(loop) {
      case 'home':
        this.audio = new Audio("assets/audio/crabs.mono.22.mp3");
        waitTime = 0;
        break;
      case 'credits':
        this.audio = new Audio("assets/audio/loops-updated/cocktails1-loop-mono.mp3");
        waitTime = 500;
        break;
      case 'ask':
        this.audio = new Audio("assets/audio/cocktails3.mono.22.mp3");
        waitTime = 800;
        break;
      case 'game':
        this.audio = new Audio("assets/audio/figure1.mono.22.mp3");
        waitTime = 800;
        break;
      case 'bio1':
        this.audio = new Audio("assets/audio/grind1.mono.mp3");
        waitTime = 800;
        break;
      case 'bio2':
        this.audio = new Audio("assets/audio/loops-updated/grind2-loop-mono.mp3");
        break;
      case 'bio3':
        this.audio = new Audio("assets/audio/grind3.mono.mp3");
        break;
      default:
        this.audio = new Audio("assets/audio/crabs.mono.22.mp3");
        waitTime = 800;
        break;
    }

    // if (newRoute !== '') {
      new Promise((res) => {
        setTimeout(() => {
          // this.router.navigateByUrl(newRoute);
          // res();
          this.audio.play();
        }, waitTime);
      })

      this.audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
      }, false);
    // }


  }

  public stopLoop(): void {
    // console.log('stop audio ::: ', this.audio)
    if (this.audio) {
      this.audio.pause();
    }
  }

}
