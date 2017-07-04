import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRoute } from '@angular/router';
//toaster
import { ToastrService } from 'toastr-ng2';

//s
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class PanitiaGuard implements CanActivateChild {

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
    }

    canActivateChild(){
        console.log("check child route");
        
        if(this.roles=="panitia")// 1 berarti roles Panitia
            return true;

        this.toastrService.warning('Silahkan login terlebih sebagai panitia dahulu!', 'Warning!');

        return false;

    }
}