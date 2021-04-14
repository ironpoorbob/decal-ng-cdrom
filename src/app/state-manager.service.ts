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
    baseUrl: '',
    videoObj: {
      videoUrl: '',
      autoPlay: undefined,
      clickPlay: false
    }
  }

  constructor() { }

  /**
   * get/broadcast data object when updated
   */
  public getDataObj() {
    this.dataObjSource.next(this.dataObj);
  }

  /**
   * set data object by key 
   * @param key string
   * @param value boolean/string/object
   */
  public setValue(key: string, value: any) {
    this.dataObj[key] = value;
    this.getDataObj();
  }


  /**
   * start and stop audio loops
   * @param loop name of section/loop
   */
  public startLoop(loop: string): void {
    let waitTime = undefined;

    if (this.dataObj.loop !== loop) { // if loop not already set or running
      this.dataObj['loop'] = loop;
      switch(loop) {
        case 'home':
          this.audio = new Audio("assets/audio/loops-updated/crabs.mono.22.mp3");
          waitTime = 0;
          break;
        case 'credits':
          this.audio = new Audio("assets/audio/loops-updated/cocktails1-loop-mono.mp3");
          waitTime = 500;
          break;
        case 'ask':
          this.audio = new Audio("assets/audio/loops-updated/cocktails3-loop-mono.mp3");
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
          this.audio = new Audio("assets/audio/loops-updated/crabs.mono.22.mp3");
          waitTime = 800;
          break;
      }

      new Promise((res) => {
        setTimeout(() => {
          this.audio.play(); // TODO: uncomment to get loops
        }, waitTime);
      })
    }

    this.audio.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play(); // TODO: uncomment to get loops
    }, false);
  }

  /**
   * stop loops and set loop value to empty string
   */
  public stopLoop(): void {
    if (this.audio) {
      this.audio.pause();
      this.dataObj['loop'] = '';
    }
  }

}
