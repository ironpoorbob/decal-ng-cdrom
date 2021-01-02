import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, ReplaySubject } from 'rxjs';
import { StateManagerService } from '../state-manager.service';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})
export class BioComponent implements OnInit, OnDestroy {

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
  }

  public ngOnDestroy(): void {
    this.dataObjSubscription.unsubscribe();
  }

  public handleMenuClick() {
    this.router.navigateByUrl('/home');
    this.stateManagerService.stopLoop();
  }

}
