import { Location } from '@angular/common';
import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../shared/models/User";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  hide = true;
  isError = false;
  errorMsg = "";

  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  });

  ngOnInit() {
  }

  constructor(private location: Location, private authService: AuthService, private router: Router, private userServ: UserService) { }

  onSubmit() {
    if (this.signUpForm.value.password === this.signUpForm.value.rePassword && this.signUpForm.value.password.length >= 6) {
      console.log(this.signUpForm.value);
      this.authService.signup(this.signUpForm.get('email')?.value, this.signUpForm.get('password')?.value).then(cred => {
        const user: User = {
          id: cred.user?.uid as string,
          email: this.signUpForm.get('email')?.value,
          username: this.signUpForm.get('email')?.value.split('@')[0],
          name: {
            firstname: this.signUpForm.get('name.firstname')?.value,
            lastname: this.signUpForm.get('name.lastname')?.value
          }
        }
        this.userServ.create(user).then(_ => {
          console.log('User created successfully.');
        }).catch(error => {
          console.error(error);
        })
        this.router.navigateByUrl('/main');
      }).catch(error => {
        console.error(error);
        this.isError = true;
        this.errorMsg = error;
      })
    }
    else {
      this.isError = true;
      this.errorMsg = "A jelszavak nem egyeznek!";
    }
  }

  goBack() {
    this.location.back();
  }

}
