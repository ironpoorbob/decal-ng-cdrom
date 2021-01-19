import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateManagerService } from '../../state-manager.service';

@Component({
  selector: 'app-bio1',
  templateUrl: './bio1.component.html',
  styleUrls: ['./bio1.component.scss']
})
export class Bio1Component implements OnInit {

  constructor(
    private router: Router,
    private stateManagerService: StateManagerService,
  ) { }

  ngOnInit(): void {
    console.log('bio1 loaded');
  }

  public handleMenuClick() {
    this.router.navigateByUrl('/home');
    this.stateManagerService.stopLoop();
  }

}
