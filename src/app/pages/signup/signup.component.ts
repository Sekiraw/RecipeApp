import { Location } from '@angular/common';
import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

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

  constructor(private location: Location, private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (this.signUpForm.value.password === this.signUpForm.value.rePassword && this.signUpForm.value.password.length >= 6) {
      console.log(this.signUpForm.value);
      this.authService.signup(this.signUpForm.get('email')?.value, this.signUpForm.get('password')?.value).then(cred => {
        this.router.navigateByUrl('/gallery');
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
