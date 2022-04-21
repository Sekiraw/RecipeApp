import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {FakeLoadingService} from "../../shared/services/fake-loading.service";
import {Observable, Subscription} from "rxjs";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  email = new FormControl('');
  password = new FormControl('');

  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;

  loading: boolean = false;

  constructor(private router: Router, private loadingService: FakeLoadingService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }

  async login() {
    this.loading = true;
    // Promise
    let myArr: Array<number> = [];
    this.loadingService.loadingWithPromise(this.email.value, this.password.value).then((_: boolean) => {
      console.log('This executed second');
      // myArr.push(1);
      this.router.navigateByUrl('/gallery');
    }).catch(error => {
      console.error('Incorrect email or password!');
    }).finally(() => {
      console.log('finally');
    });
    console.log('This executed first');
    console.log(myArr);

    this.authService.login(this.email.value, this.password.value).then(cred => {
      console.log(cred);
      this.router.navigateByUrl('/main');
      this.loading = false;
    }).catch(error => {
      console.log(error)
      this.loading = false;
    });

    // async-await
    // try {
    //   // then
    //   const _ = await this.loadingService.loadingWithPromise(this.email.value, this.password.value)
    //   this.router.navigateByUrl('/main');
    // }
    // // catch
    // catch(error)  {
    //   console.error('Incorrect email or password!');
    // }
    // // finally
    // console.log('finally');

    // Observable
    // memory leak
    // this.loadingObservation = this.loadingService.loadingWithObservable(this.email.value, this.password.value)
    // this.loadingSubscription = this.loadingObservation
    //             .subscribe({
    //               next: (data: boolean) => {
    //             this.router.navigateByUrl('/main');
    //           }, error: (error) => {
    //             console.error(error);
    //             this.loading = false;
    //           }, complete: () => {
    //             console.log('finally')
    //                 this.loading = false;
    //           }});
  }

}
