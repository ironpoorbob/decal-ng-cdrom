import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, ReplaySubject } from 'rxjs';
import { StateManagerService } from '../../state-manager.service';

@Component({
  selector: 'app-bio4',
  templateUrl: './bio4.component.html',
  styleUrls: ['./bio4.component.scss']
})
export class Bio4Component implements OnInit {
  public videoObj: object = {};

  public videoUrl: string = "";

  public dataObjSubscription: Subscription;
  public dataObj: any; // data received

  constructor(
    private router: Router,
    private stateManagerService: StateManagerService,
  ) { }

  ngOnInit(): void {
    this.dataObjSubscription = this.stateManagerService.$dataObj.subscribe(
      value => {
        this.dataObj = value;
      }
    )
    this.videoObj = {
      videoUrl: 'yT_mQ81RlDQ',
      autoPlay: 1,
      clickPlay: false
    }

    this.videoUrl = 'https://www.youtube.com/embed/yT_mQ81RlDQ?autoplay=1&rel=0&controls=2&enablejsapi=1'

    this.stateManagerService.setValue('videoObj', this.videoObj);
    // this.videoUrl = 'yT_mQ81RlDQ';
  }

  public ngOnDestroy(): void {
    this.dataObjSubscription.unsubscribe();
  }

  public handleMenuClick() {
    this.router.navigateByUrl('/home');
    this.stateManagerService.stopLoop();
  }

  public handlePrevClick() {
    // this.stateManagerService.stopLoop();
    this.stateManagerService.startLoop("bio3");
    this.router.navigateByUrl('/bio/bio3');
  }

  public handleNextClick() {
    this.stateManagerService.stopLoop();
    this.stateManagerService.startLoop("bio1");
    this.router.navigateByUrl('/bio/bio5');
  }

  public handleVideoPlay() {
    this.videoObj = {
      videoUrl: 'yT_mQ81RlDQ',
      autoPlay: 1,
      clickPlay: true
    }

    this.stateManagerService.setValue('videoObj', this.videoObj);
  }

}
