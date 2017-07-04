import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';//add http module
import { Observable } from 'rxjs/Observable';
//jwt helper
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
  public jwtHelper: JwtHelper = new JwtHelper();

  public urlLogin = 'http://localhost:8000/login/masuk';
  public urlForgorPassword = 'http://localhost:8000/login/reset';

  private currentUser;
  private token:string;
  constructor(private http:Http) { 
    this.token = localStorage.getItem('token');
  }

  login(username: string, password: string) {
		let send = JSON.stringify({username: username, password:password });//bikin data inputan lu jadi string json
		console.log(send);
		let header= new Headers();
    header.append('Content-type', 'application/json' );

    return this.http.post(this.urlLogin, send, {headers:header})
        .map((response: Response) => {
          //login succesful if there is token response
        	let token = response.json() && response.json().token;
          console.log('ini token balikan', response.json().token);
          if(token){
            //set token
            this.token = token;
            //set other to localstorage
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);            
            //return true to indicate successful login
            return true
          }
          else{
            // return false to indicate failed to login
            return false;
          }
        });
            
  }

  logout() {
      // remove user from local storage to log user out
      this.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
  }

  checkLocalStorage(){
    if(localStorage.getItem('token')!==null){
      return true;
    }
    else
      return false;
  }

  forgotPassword(username:string){
    let send = JSON.stringify({username: username});//bikin data inputan lu jadi string json
    console.log(send);
    let header= new Headers();
    header.append('Content-type', 'application/json' );

    return this.http.post(this.urlForgorPassword, send, {headers:header})
        .map((response: Response) => {
          if (response.json().status==true){//
            return true
          }
          else return false
        });
  }


}
