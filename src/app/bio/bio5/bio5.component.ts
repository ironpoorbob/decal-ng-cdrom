import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, ReplaySubject } from 'rxjs';
import { StateManagerService } from '../../state-manager.service';

@Component({
  selector: 'app-bio5',
  templateUrl: './bio5.component.html',
  styleUrls: ['./bio5.component.scss']
})
export class Bio5Component implements OnInit {

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

    this.imagePath = this.dataObj.baseUrl + 'assets/images/boom11.jpg';
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
    // this.stateManagerService.startLoop("bio1");
    this.router.navigateByUrl('/bio/bio4');
  }

  public handleNextClick() {
    this.stateManagerService.stopLoop();
    this.stateManagerService.startLoop("bio1");
    this.router.navigateByUrl('/bio/bio6');
  }

}
