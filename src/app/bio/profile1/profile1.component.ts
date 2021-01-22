import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, ReplaySubject } from 'rxjs';
import { StateManagerService } from '../../state-manager.service';

@Component({
  selector: 'app-profile1',
  templateUrl: './profile1.component.html',
  styleUrls: ['./profile1.component.scss']
})
export class Profile1Component implements OnInit {

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
        // console.log('object state in button: ', value);
      }
    )
    
    this.handleLoadSFX();

  }

  public handleLoadSFX() {
    let audio = new Audio(this.dataObj.baseUrl + 'assets/audio/profiles/teletype_3.mp3');
    audio.play();
  }

  public ngOnDestroy(): void {
    this.dataObjSubscription.unsubscribe();
  } 

  public handleBackClick() {
    this.router.navigateByUrl('/bio/bio3');
  }

}
