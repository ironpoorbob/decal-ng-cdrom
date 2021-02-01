import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, ReplaySubject } from 'rxjs';
import { StateManagerService } from '../../state-manager.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-profile3',
  templateUrl: './profile3.component.html',
  styleUrls: ['./profile3.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        "max-height": 0
      })),
      state('closed', style({
        "max-height": 300
      })),
      transition('open => closed', [
        animate('0.6s ease-out')
      ]),
      transition('closed => open', [
        animate('0.5s ease-out')
      ]),
    ]),
    trigger('openClose2', [
      state('open2', style({
        "max-height": 0
      })),
      state('closed2', style({
        "max-height": 450
      })),
      transition('open2 => closed2', [
        animate('1s ease-out')
      ]),
      transition('closed2 => open2', [
        animate('0.5s ease-out')
      ]),
    ])
  ]
})
export class Profile3Component implements OnInit {

  public dataObjSubscription: Subscription;
  public dataObj: any; // data received

  public isOpen: boolean = false;
  public isOpen2: boolean = false;

  public audio: any;

  constructor(
    private stateManagerService: StateManagerService,
    private router: Router
    ) { }

  public ngOnInit(): void {
    this.isOpen = true;
    this.isOpen2 = true;
    this.dataObjSubscription = this.stateManagerService.$dataObj.subscribe(
      value => {
        this.dataObj = value;
      }
    )

    this.handleLoadSFX();

    new Promise((res) => {
      setTimeout(() => {
        this.handleAnimation();
      }, 1000);
    })

    new Promise((res) => {
      setTimeout(() => {
        this.handleAnimation2();
      }, 5000);
    })
  }

  public handleAnimation() {
    this.isOpen = !this.isOpen;
    console.log('handle animation: ', this.isOpen);
  }

  public handleAnimation2() {
    this.isOpen2 = !this.isOpen2;
    console.log('handle animation2: ', this.isOpen);
  }

  public handleLoadSFX() {
    this.audio = new Audio(this.dataObj.baseUrl + 'assets/audio/profiles/steve-type-mix-mono-2.mp3');
    this.audio.play();
  }

  public ngOnDestroy(): void {
    this.dataObjSubscription.unsubscribe();
  } 

  public handleBackClick() {
    this.audio.pause();
    this.stateManagerService.startLoop("bio3");
    this.router.navigateByUrl('/bio/bio3');
  }

}
