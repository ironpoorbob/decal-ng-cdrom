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
  selector: 'app-profile1',
  templateUrl: './profile1.component.html',
  styleUrls: ['./profile1.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        "max-height": 0
      })),
      state('closed', style({
        "max-height": 560
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ])
  ]
})
export class Profile1Component implements OnInit {

  public dataObjSubscription: Subscription;
  public dataObj: any; // data received

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
        // console.log('object state in button: ', value);
      }
    )
    
    this.handleLoadSFX();

    new Promise((res) => {
      setTimeout(() => {
        this.handleAnimation();
      }, 1000);
    })

  }

  public handleAnimation() {
    this.isOpen = !this.isOpen;
  }

  public handleLoadSFX() {
    this.audio = new Audio(this.dataObj.baseUrl + 'assets/audio/profiles/teletype_3.mp3');
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
