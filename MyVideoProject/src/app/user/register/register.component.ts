import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterValidators } from '../validators/register-validators';
import IUser from 'src/app/models/user.model';
import { EmailTaken } from '../validators/email-taken';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  //Reactive Forms 
  constructor(private auth: AuthService, private emailTaken: EmailTaken) {}

  showAlert = false;
  alertMsg = 'Please wait! Your acount is being created.';
  alertColor = 'blue';
  inSubmission = false;


  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);
  email= new FormControl('', [
    Validators.required,
    Validators.email
  ], [this.emailTaken.validate]);
  age = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(18),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ]);
  confirm_password = new FormControl('', [
    Validators.required
  ]);

  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13)
  ]);
  
 registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber
 }, [RegisterValidators.match('password', 'confirm_password')])

 async register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your acount is being created.';
    this.alertColor = 'blue';
    this.inSubmission = true;

    

    try {
     await this.auth.createUser(this.registerForm.value as unknown as IUser)
    } catch (err) {
      this.alertMsg = 'Unexpected error !';
      this.alertColor = 'red';
      this.inSubmission = false;
      return;
    }
    this.alertMsg = 'Success! Your account has been created.';
    this.alertColor = 'green';
  }
 }
      



