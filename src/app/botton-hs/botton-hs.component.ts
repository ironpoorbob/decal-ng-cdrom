import { Component, Input, OnInit } from '@angular/core';
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
export class BottonHsComponent implements OnInit {
  @Input() data: any;
  @Input() index: number;

  public dataObjSubscription: Subscription;
  public dataObj: any; // data received

  constructor(
    private stateManagerService: StateManagerService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.dataObjSubscription = this.stateManagerService.$dataObj.subscribe(
      value => {
        this.dataObj = value;
        // console.log('object state in button: ', value);
      }
    )
  }

  public handleFistClick(evt, index) {
    console.log('index sfx: ', index);
    let audio;
    let audio2;
    let section = '';
    console.log('clicked: ', evt.target);
    switch(index) {
      case 0:
        audio = new Audio("assets/audio/hits/fist1-hit.mp3");
        audio2 = new Audio('assets/audio/hits/bodyHit1.mp3');
        section = 'bio1';
        this.router.navigateByUrl('/bio');
        break;
      case 1:
        audio = new Audio("assets/audio/hits/fist2-hit.mp3");
        audio2 = new Audio('assets/audio/hits/bodyHit2.mp3');
        section = 'ask';
        this.router.navigateByUrl('/ask');
        break;
      case 2:
        audio = new Audio("assets/audio/hits/fist3-hit.mp3");
        audio2 = new Audio('assets/audio/hits/bodyHit3.mp3');
        section = 'game';
        this.router.navigateByUrl('/game');
        break;
      case 3:
        audio = new Audio("assets/audio/hits/fist1-hit.mp3");
        audio2 = new Audio('assets/audio/hits/bodyHit1.mp3');
        this.router.navigateByUrl('/outro');
        break;
      default:
        audio = new Audio("assets/audio/hits/fist1-hit.mp3");
        audio2 = new Audio('assets/audio/hits/bodyHit1.mp3');
        section = 'home';
        this.router.navigateByUrl('/home');
    }

    audio.play();
    audio2.play();

    this.stateManagerService.stopLoop();
    if (section !== '') {
      this.stateManagerService.startLoop(section);
    }


    // let audio = new Audio("assets/audio/hits/fist1-hit.mp3");
    // audio.play();
    // let audio2 = new Audio('assets/audio/hits/bodyHit2.mp3');
    // audio2.play();
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
