import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile1',
  templateUrl: './profile1.component.html',
  styleUrls: ['./profile1.component.scss']
})
export class Profile1Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public handleBackClick() {
    this.router.navigateByUrl('/bio/bio3');
  }

}
