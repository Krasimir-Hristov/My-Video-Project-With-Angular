import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public user$ = this.auth.currentUser

  constructor(private readonly auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

}
