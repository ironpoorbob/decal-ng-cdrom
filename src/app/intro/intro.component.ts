import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, ReplaySubject } from 'rxjs';
import { StateManagerService } from '../state-manager.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit, OnDestroy {
  public dataObjSubscription: Subscription;
  public dataObj: any; // data received

  public imgPath: string = '';

  public audio: any;
  public audio2: any;
  public audioVal1: string = '';
  public audioVal2: string = '';

  public showFoot: boolean = false;
  public showText: boolean = false;
  public showText2: boolean = false;
  public showText3: boolean = false;
  public showText4: boolean = false;
  public showControls: boolean = false;

  public showStart: boolean = false;
  
  constructor(
    private stateManagerService: StateManagerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataObjSubscription = this.stateManagerService.$dataObj.subscribe(
      value => {
        this.dataObj = value;
      }
    )

    this.imgPath = this.dataObj.baseUrl + 'assets/images/foot.png';

    this.audioVal1 = this.dataObj.baseUrl + 'assets/audio/hits/fist1-hit.mp3';
    this.audioVal2 = this.dataObj.baseUrl + 'assets/audio/hits/bodyHit1.mp3';

    this.audio = new Audio(this.audioVal1);
    this.audio2 = new Audio(this.audioVal2);

  }

  public ngOnDestroy(): void {
    this.dataObjSubscription.unsubscribe();
  }

  public handleMenuClick() {
    this.router.navigateByUrl('/home');
  }

  public handleStartClick() {
    this.showStart = true;
    this.startAnimation();
  }

  public startAnimation() {
    new Promise((res) => {
      setTimeout(() => {
        this.showFoot = true;
        this.audio.play();
        this.audio2.play();
      }, 1000);
    })

    new Promise((res) => {
      setTimeout(() => {
        this.showText = true;
      }, 2000);
    })
    new Promise((res) => {
      setTimeout(() => {
        this.showText2 = true;
      }, 2200);
    })
    new Promise((res) => {
      setTimeout(() => {
        this.showText3 = true;
      }, 2600);
    })
    new Promise((res) => {
      setTimeout(() => {
        this.showText4 = true;
      }, 3100);
    })
    new Promise((res) => {
      setTimeout(() => {
        this.showControls = true;
      }, 4000);
    })
  }

}
