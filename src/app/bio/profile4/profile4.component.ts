import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile4',
  templateUrl: './profile4.component.html',
  styleUrls: ['./profile4.component.scss']
})
export class Profile4Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public handleBackClick() {
    this.router.navigateByUrl('/bio/bio3');
  }

}
