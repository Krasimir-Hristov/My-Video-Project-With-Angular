import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  credentials = {
    name: '',
    email: '',
    age: '',
    password: '',
    repass: '',
    phoneNumber: ''
  }
  constructor() { }

  ngOnInit(): void {
  }

  register() {
    console.log(this.credentials)
  }

}
