import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, ReplaySubject } from 'rxjs';
import { StateManagerService } from '../../state-manager.service';

@Component({
  selector: 'app-bio2',
  templateUrl: './bio2.component.html',
  styleUrls: ['./bio2.component.scss']
})
export class Bio2Component implements OnInit {
  public imagePath = '';

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
      }
    )
    this.imagePath = this.dataObj.baseUrl + 'assets/images/big-boom-7.jpg';

    // this wont work on load because the browser wont play music without user interactivty first
    // this.stateManagerService.stopLoop();
    // this.stateManagerService.startLoop('bio2');
  }

  public ngOnDestroy(): void {
    this.dataObjSubscription.unsubscribe();
  }

  public handleMenuClick() {
    this.router.navigateByUrl('/home');
    this.stateManagerService.stopLoop();
  }

  public handlePrevClick() {
    this.stateManagerService.stopLoop();
    this.stateManagerService.startLoop("bio1");
    this.router.navigateByUrl('/bio/bio1');
  }

  public handleNextClick() {
    this.stateManagerService.stopLoop();
    this.stateManagerService.startLoop("bio3");
    this.router.navigateByUrl('/bio/bio3');
  }

}
