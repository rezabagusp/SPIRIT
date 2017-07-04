import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//injedct sercice
import { AuthenticationService } from './services/authentication.service';
//jwt helper
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
//toaster
import { ToastrService } from 'toastr-ng2';
@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  providers:[AuthenticationService]
})

export class AppComponent { 
	
	constructor(private router:Router, private authenticationService: AuthenticationService,
							private toastrService: ToastrService){
		console.log("masuk app component")
	}
}
