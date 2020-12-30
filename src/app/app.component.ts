import { Component, OnInit } from '@angular/core';
import { StateManagerService } from './state-manager.service';
import { Subscription, ReplaySubject } from 'rxjs';

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
    // this.dataObjSubscription = this.stateManagerService.$dataObj.subscribe(
    //   value => {
    //     this.dataObj = value;
    //     // console.log('object state MAIN APP:::::: ', value);
    //   }
    // )
  }
}
