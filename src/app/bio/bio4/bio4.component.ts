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
      autoPlay: 1
    }
    // this.videoUrl = 'yT_mQ81RlDQ';
  }

  public ngOnDestroy(): void {
    this.dataObjSubscription.unsubscribe();
  }

  public handleMenuClick() {
    this.router.navigateByUrl('/home');
    this.stateManagerService.stopLoop();
  }

}
