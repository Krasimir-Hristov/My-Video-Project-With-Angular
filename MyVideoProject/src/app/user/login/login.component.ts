import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  }

  //TemplateDrivin Forms
  constructor(private auth: AngularFireAuth) { }

  showAlert = false;
  alertMsg = 'Please wait! We are logging you in.';
  alertColor = 'blue';
  inSubmission = false;

  ngOnInit(): void {
  }

  async login() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! We are logging you in.';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try {
        await this.auth.signInWithEmailAndPassword(
        this.credentials.email, this.credentials.password
      )
    } catch (e) {
      this.inSubmission = false;
      this.alertMsg = 'Unexpected error !';
      this.alertColor = 'red';
      return;
    }

    this.alertMsg = 'Success! You are logged in!';
    this.alertColor = 'green';
  }

}
