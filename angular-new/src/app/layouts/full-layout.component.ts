import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'toastr-ng2';
//ROUTING 
import { Router, ActivatedRoute } from '@angular/router';
//inject service 
import { AuthenticationService } from '../services/authentication.service';
import 'rxjs/add/observable/of';
import { Http,Headers } from '@angular/http';
import 'rxjs/Rx';
//jwt helper
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  providers: [AuthenticationService]
})
export class FullLayoutComponent implements OnInit {

    //test jwt for encode status
  jwtHelper: JwtHelper = new JwtHelper();

  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};
  public role;

  constructor(private http: Http,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router,
              private toastrService: ToastrService
              ){
    var user = this.jwtHelper.decodeToken(localStorage.getItem('token'))
    if(user.status_pj)
      this.role = "penanggungjawab";
    else if(user.status_panitia)
      this.role = "panitia";
    console.log('routeactivated parent, login as')
    console.log(this.role)
    console.log(user);

  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }


}
