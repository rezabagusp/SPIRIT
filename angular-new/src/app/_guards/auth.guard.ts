import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRoute } from '@angular/router';
//toaster
import { ToastrService } from 'toastr-ng2';

//s
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

    //test jwt for encode status
    jwtHelper: JwtHelper = new JwtHelper();
    token;
    roles;
    constructor(private router: Router,
    			private toastrService: ToastrService,
                private route: ActivatedRoute ) {
        this.token = localStorage.getItem('token');
        var user = this.jwtHelper.decodeToken(this.token)
        
    }

    canActivate() {
        if (localStorage.getItem('token')) {
            // logged in so return true
        	console.log("kamu udah login, dari auth guard");
            return true;

        }

        this.toastrService.warning('Silahkan login terlebih dahulu!', 'Warning!');
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        console.log("kamu belum login, dari auth guard");
        return false;
    }

}