import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { StateManagerService } from './state-manager.service';
import { Subscription, ReplaySubject } from 'rxjs';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Decal';

  public dataObjSubscription: Subscription;
  public dataObj: any; // data received

  constructor(
    private stateManagerService: StateManagerService,
    // @Inject(APP_BASE_HREF) public baseHref: string
  ) {}

  ngOnInit(): void {
    if (environment.production) {
      console.log('environment prod: ', environment);
      this.stateManagerService.setValue('baseUrl', '/test/decal-ng-cdrom/');
      // set prod base path global variable
    } else {
      // set non prod base path global variable
      console.log('environment prod: ', environment);
      this.stateManagerService.setValue('baseUrl', '/');
    }
    // this.dataObjSubscription = this.stateManagerService.$dataObj.subscribe(
    //   value => {
    //     this.dataObj = value;
    //     // console.log('object state MAIN APP:::::: ', value);
    //   }
    // )
    // this.resetFistZindex();
    // console.log('whats base href ::: ', this.baseHref);

  }

  // pause/stop music if browser resized below 992px wide
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.target.innerWidth;
    // console.log('window width: ', event.target.innerWidth);
    if (event.target.innerWidth < 992) {
      this.stateManagerService.stopLoop();
    }
  }

  // public resetFistZindex(): void {

  // }

}
