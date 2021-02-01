import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, ReplaySubject } from 'rxjs';
import { StateManagerService } from '../../state-manager.service';

@Component({
  selector: 'app-bio3',
  templateUrl: './bio3.component.html',
  styleUrls: ['./bio3.component.scss']
})
export class Bio3Component implements OnInit {
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

    this.imagePath = this.dataObj.baseUrl + 'assets/images/full-band-1.jpg';
  }

  public ngOnDestroy(): void {
    this.dataObjSubscription.unsubscribe();
  }

  public handleMenuClick() {
    this.router.navigateByUrl('/home');
    this.stateManagerService.stopLoop();
  }

  public async handleProfileClick(index) {
    this.stateManagerService.stopLoop();
    let audio = new Audio(this.dataObj.baseUrl + 'assets/audio/profiles/spacecLick3.mp3');
    await audio.play();

    this.router.navigateByUrl('/bio/profile' + index);
  }

  public handlePrevClick() {
    this.stateManagerService.stopLoop();
    this.stateManagerService.startLoop("bio2");
    this.router.navigateByUrl('/bio/bio2');
  }

  public handleNextClick() {
    this.stateManagerService.stopLoop();
    this.router.navigateByUrl('/bio/bio4');
  }

}
