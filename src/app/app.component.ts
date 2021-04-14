import { Component, HostListener, OnInit } from '@angular/core';
import { StateManagerService } from './state-manager.service';
import { Subscription } from 'rxjs';

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
  ) {}

  ngOnInit(): void {
    if (environment.production) {
      console.log('environment prod: ', environment);
      this.stateManagerService.setValue('baseUrl', '/Decal/');
      // set prod base path global variable
    } else {
      // set non prod base path global variable
      console.log('environment non prod: ', environment);
      this.stateManagerService.setValue('baseUrl', '/');
    }
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

}
