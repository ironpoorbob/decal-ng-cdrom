import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { VideoPlayerComponent } from '../../video-player/video-player.component';

@Component({
  selector: 'app-bio4',
  templateUrl: './bio4.component.html',
  styleUrls: ['./bio4.component.scss']
})
export class Bio4Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public handleMenuClick() {
    this.router.navigateByUrl('/home');
    // this.stateManagerService.stopLoop();
  }

}
