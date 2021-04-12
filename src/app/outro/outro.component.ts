import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, ReplaySubject } from 'rxjs';
import { StateManagerService } from '../state-manager.service';

@Component({
  selector: 'app-outro',
  templateUrl: './outro.component.html',
  styleUrls: ['./outro.component.scss']
})
export class OutroComponent implements OnInit, OnDestroy {

  public dataObjSubscription: Subscription;
  public dataObj: any; // data received

  constructor(
    private stateManagerService: StateManagerService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.dataObjSubscription = this.stateManagerService.$dataObj.subscribe(
      value => {
        this.dataObj = value;
      }
    )
  }

  public handleMenuClick() {
    this.router.navigateByUrl('/home');
    // this.stateManagerService.stopLoop();
  }

  public ngOnDestroy(): void {
    this.dataObjSubscription.unsubscribe();
  }

  public getVideoUrl() {
    return 'https://www.youtube-nocookie.com/embed/fj-buH5fhAw?autoplay=1&rel=0&controls=0&enablejsapi=1';
  }

}
