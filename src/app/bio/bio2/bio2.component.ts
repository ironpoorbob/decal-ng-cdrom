import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bio2',
  templateUrl: './bio2.component.html',
  styleUrls: ['./bio2.component.scss']
})
export class Bio2Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public handleMenuClick() {
    this.router.navigateByUrl('/home');
    // this.stateManagerService.stopLoop();
  }

}
