import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bio3',
  templateUrl: './bio3.component.html',
  styleUrls: ['./bio3.component.scss']
})
export class Bio3Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public handleMenuClick() {
    this.router.navigateByUrl('/home');
    // this.stateManagerService.stopLoop();
  }

}
