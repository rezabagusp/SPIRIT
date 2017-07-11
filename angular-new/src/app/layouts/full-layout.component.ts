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
import { PanitiaService } from '../services/panitia.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  providers: [AuthenticationService, PanitiaService]
})
export class FullLayoutComponent implements OnInit {

    //test jwt for encode status
  jwtHelper: JwtHelper = new JwtHelper();

  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};
  public role;
  public roleDepan;
  public username;
  private participant = [];

  constructor(private http: Http,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router,
              private toastrService: ToastrService,
              private panitiaService: PanitiaService
              ){
  var user = this.jwtHelper.decodeToken(localStorage.getItem('token'))
  if(user.status_pj){
    this.role = "penanggungjawab";
    this.roleDepan = "PJ KONTINGEN";
    this.username = user.username_pj
  }

  else if(user.status_panitia){
    this.role = "panitia";
    this.roleDepan = "PANITIA";
    this.username = user.username_panitia 
  }
  console.log('routeactivated parent, login as')
  console.log(this.role)
  console.log("isi jwt helper", user);
  console.log("expired ?", this.jwtHelper.isTokenExpired(localStorage.getItem('token')));

  }

  ngOnInit(): void {
    this.getPeserta();
  }

  public getPeserta(){
    this.panitiaService.getAllPeserta().subscribe(
      data => {
        this.participant = data;
        console.log(this.participant)
      }
    )
  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }


}
