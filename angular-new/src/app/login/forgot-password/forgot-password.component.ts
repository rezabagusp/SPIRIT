import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import 'rxjs/add/observable/of';
import { Http,Headers } from '@angular/http';
import 'rxjs/Rx';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private _fb: FormBuilder,private authenticationService: AuthenticationService,
              private toastrService: ToastrService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
    })
  }

  onSubmit(){
    let send = this.loginForm.value.username;
    console.log(send);
    this.authenticationService.forgotPassword(send)
      .subscribe(result => {
        console.log("hasil balikan reset pass : ")
        console.log(result)
        if(result){//if true then reset succeed
          this.toastrService.success('password reset sudah di kirim ke email Kamu','Success!');
          this.router.navigate(['login']);
        }
        else this.toastrService.info('Username not found','Info!');
      });

  }

}
