import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRoute } from '@angular/router';
//toaster
import { ToastrService } from 'toastr-ng2';

//s
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class PenanggungJawabGuard implements CanActivateChild {

    //test jwt for encode status
    jwtHelper: JwtHelper = new JwtHelper();
    token;
    roles;
    constructor(private router: Router,
    			private toastrService: ToastrService,
                private route: ActivatedRoute ) {
        this.token = localStorage.getItem('token');
        var user = this.jwtHelper.decodeToken(this.token)
        if(user.status_pj)
          this.roles = "penanggungjawab";
        else if(user.status_panitia)
          this.roles = "panitia";        
        console.log(this.route.snapshot)
    }

    canActivateChild(){
        console.log("check child route as : ");
        console.log(this.roles)
        
        if(localStorage.getItem('token') && !this.jwtHelper.isTokenExpired(localStorage.getItem('token')) && this.roles=="penanggungjawab")// 0 berarti roles Pj
            return true;

        else{             
            this.router.navigate(['/login']);
            this.toastrService.warning('Session anda telah habis');
            return false;
        }

    }
}