import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, ReplaySubject } from 'rxjs';
import { StateManagerService } from '../../state-manager.service';

@Component({
  selector: 'app-bio1',
  templateUrl: './bio1.component.html',
  styleUrls: ['./bio1.component.scss']
})
export class Bio1Component implements OnInit {

  public imagePath = '';

  public dataObjSubscription: Subscription;
  public dataObj: any; // data received

  constructor(
    private router: Router,
    private stateManagerService: StateManagerService,
  ) { }

  ngOnInit(): void {
    console.log('bio1 loaded');
    this.dataObjSubscription = this.stateManagerService.$dataObj.subscribe(
      value => {
        this.dataObj = value;
      }
    )

    this.imagePath = this.dataObj.baseUrl + 'assets/images/big-boom-8.jpg';
  }

  public ngOnDestroy(): void {
    this.dataObjSubscription.unsubscribe();
  }

  public handleMenuClick() {
    this.router.navigateByUrl('/home');
    this.stateManagerService.stopLoop();
  }

  public handleNextClick() {
    this.stateManagerService.stopLoop();
    this.stateManagerService.startLoop("bio2");
    this.router.navigateByUrl('/bio/bio2');
  }

}
