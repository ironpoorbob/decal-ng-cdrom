import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile3',
  templateUrl: './profile3.component.html',
  styleUrls: ['./profile3.component.scss']
})
export class Profile3Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public handleBackClick() {
    this.router.navigateByUrl('/bio/bio3');
  }

}
