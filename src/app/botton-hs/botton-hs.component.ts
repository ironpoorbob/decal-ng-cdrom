import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, ReplaySubject } from 'rxjs';
import { StateManagerService } from '../state-manager.service';

interface FistComponentData {
  name: string,
  headline: string,
}

@Component({
  selector: 'app-botton-hs',
  templateUrl: './botton-hs.component.html',
  styleUrls: ['./botton-hs.component.scss']
})
export class BottonHsComponent implements OnInit, OnDestroy {
  @Input() data: any;
  @Input() index: number;

  public expandedName: string = '';

  public fistZindex: number = undefined;
  // public fistZindex1: number = undefined;
  // public fistZindex2: number = undefined;

  public dataObjSubscription: Subscription;
  public dataObj: any; // data received

  // public bobImage = 'assets/images/fist-of-bob.png';
  // public chrisImage = 'assets/images/fist-of-chris-c.png';
  // public starkImage = 'assets/images/fist-of-chris-s.png';

  // &.bob {
  //   background-image: url(/assets/images/fist-of-bob.png);
  // }
  // &.chris {
  //   background-image: url(#{$assetBasePath}images/fist-of-chris-c.png);
  // }
  // &.stark {
  //   background-image: url(#{$assetBasePath}images/fist-of-chris-s.png);
  // }


  constructor(
    private stateManagerService: StateManagerService,
    private router: Router
    ) { }

  ngOnInit(): void {
    console.log('whats in data: ', this.data);

    this.dataObjSubscription = this.stateManagerService.$dataObj.subscribe(
      value => {
        this.dataObj = value;
        // console.log('object state in button: ', value);
      }
    )

    // this.initialZindexSet();
    this.fistZindex = 10 + this.index;
    // this.fistZindex1 = 11;
    // this.fistZindex2 = 12;

  }

  public setZindex(index, val) {
    return index + val;
  }

  public ngOnDestroy(): void {
    this.dataObjSubscription.unsubscribe();
  }

  public handleFistClick(evt, index, name) {
    // console.log('index sfx: ', index);
    this.fistZindex = 40;

    // this.setZindex(index, 40);
    let audio;
    let audio2;
    let audioVal1 = '';
    let audioVal2 = '';
    let section = '';
    let newRoute = '';
    this.expandedName = name;
    console.log('clicked: ', evt.target, ' : ', name, ' : ', index);
    switch(index) {
      case 0:
        audioVal1 = 'assets/audio/hits/fist1-hit.mp3';
        audioVal2 = 'assets/audio/hits/bodyHit1.mp3';
        section = 'bio1';
        newRoute = '/bio';
        break;
      case 1:
        audioVal1 = 'assets/audio/hits/fist2-hit.mp3';
        audioVal2 = 'assets/audio/hits/bodyHit2.mp3';
        section = 'ask';
        newRoute = '/ask';
        break;
      case 2:
        audioVal1 = 'assets/audio/hits/fist3-hit.mp3';
        audioVal2 = 'assets/audio/hits/bodyHit3.mp3';
        section = 'game';
        newRoute = '/game';
        break;
      case 3:
        audioVal1 = 'assets/audio/hits/fist1-hit.mp3';
        audioVal2 = 'assets/audio/hits/bodyHit1.mp3';
        this.router.navigateByUrl('/outro');
        break;
      default:
        audioVal1 = 'assets/audio/hits/fist1-hit.mp3';
        audioVal2 = 'assets/audio/hits/bodyHit1.mp3';
        section = 'home';
        this.router.navigateByUrl('/home');
    }

    // this.dataObj
    // console.log('audio path: ', this.dataObj.baseUrl + audioVal1);
    audio = new Audio(this.dataObj.baseUrl + audioVal1);
    audio2 = new Audio(this.dataObj.baseUrl + audioVal2);

    audio.play();
    audio2.play();

    this.stateManagerService.stopLoop();
    if (section !== '') {
      this.stateManagerService.startLoop(section);
    }

    if (newRoute !== '') {
      new Promise((res) => {
        setTimeout(() => {
          this.router.navigateByUrl(newRoute);
          // res();
        }, 300);
      })
    }

    console.log('promise : ', Promise);
  }

  public handleMouseEnter(evt, index) {
    this.stateManagerService.setValue('hpButton' + index, true);
    // console.log('hover : ', index, ' : ', evt.target);
  }

  public handleMouseLeave(evt, index) {
    this.stateManagerService.setValue('hpButton' + index, false);
    // console.log('hover : ', index, ' : ', evt.target);
  }

}
