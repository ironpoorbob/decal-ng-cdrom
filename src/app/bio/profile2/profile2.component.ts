import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile2',
  templateUrl: './profile2.component.html',
  styleUrls: ['./profile2.component.scss']
})
export class Profile2Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public handleBackClick() {
    this.router.navigateByUrl('/bio/bio3');
  }

}
