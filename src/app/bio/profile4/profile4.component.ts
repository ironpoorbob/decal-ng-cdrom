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
  selector: 'app-profile4',
  templateUrl: './profile4.component.html',
  styleUrls: ['./profile4.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        "max-height": 0
      })),
      state('closed', style({
        "max-height": 640
      })),
      transition('open => closed', [
        animate('1s ease-out')
      ]),
      transition('closed => open', [
        animate('0.5s ease-out')
      ]),
    ])
  ]
})
export class Profile4Component implements OnInit {

  public dataObjSubscription: Subscription;
  public dataObj: any; // data received

  public imgPath: string = '';

  public isOpen: boolean = true;

  public audio: any;

  constructor(
    private stateManagerService: StateManagerService,
    private router: Router
    ) { }

  public ngOnInit(): void {
    this.isOpen = true;
    this.dataObjSubscription = this.stateManagerService.$dataObj.subscribe(
      value => {
        this.dataObj = value;
      }
    )

    this.imgPath = this.dataObj.baseUrl + 'assets/images/chris-carroll-face.jpg';

    this.handleLoadSFX();

    new Promise((res) => {
      setTimeout(() => {
        this.handleAnimation();
      }, 500);
    })
  }

  public handleAnimation() {
    this.isOpen = !this.isOpen;
  }

  public handleLoadSFX() {
    this.audio = new Audio(this.dataObj.baseUrl + 'assets/audio/profiles/teletype_4.mp3');
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
