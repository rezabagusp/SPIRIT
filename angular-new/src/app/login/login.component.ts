import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { moveIn } from '../router.animations';

//inject Service
import { AuthenticationService } from '../services/authentication.service';
import 'rxjs/add/observable/of';
import { Http,Headers } from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService],

  animations: [moveIn()],
  host: {
    '[@moveIn]': ''
  }
})

export class LoginComponent implements OnInit {
  returnUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: Http,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log(this.returnUrl);


  }

  //atribut2 login
  username="";
  password="";
  path = 'http://localhost:8000/login/masuk';
  datalist;

  login(){
    let send = {username: this.username, password:this.password };//bikin data inputan lu jadi string json
    console.log(send);

    let header= new Headers();
    header.append('Content-type', 'application/json' );

    this.authenticationService.login(this.username, this.password)
    .subscribe(
      result=> {
        if(result){
          swal(
            'Success',
            'Click Ok',
            'success'
          )
          this.router.navigate(['dashboard']);//if succes masuk ke halaman lain
        }
        else
          swal(
            'Failed',
            'Invalid Username or Password',
            'info'
          )
     }
    );
  }

  test(){
          swal(
            'Failed',
            'wrong Username or Password',
            'info'
          )
  }
}
