import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, ReplaySubject } from 'rxjs';
import { StateManagerService } from '../../state-manager.service';

@Component({
  selector: 'app-bio6',
  templateUrl: './bio6.component.html',
  styleUrls: ['./bio6.component.scss']
})
export class Bio6Component implements OnInit {

  public imagePath = '';

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

    this.imagePath = this.dataObj.baseUrl + 'assets/images/big-boom-6.jpg';
  }

  public ngOnDestroy(): void {
    this.dataObjSubscription.unsubscribe();
  }

  public handleMenuClick() {
    this.router.navigateByUrl('/home');
    this.stateManagerService.stopLoop();
  }

}
