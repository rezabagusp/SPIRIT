import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams} from '@angular/http';//add http module
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//helper to decode jwt coy
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class PanitiaService {

  //atribut for loading bar upload
  progressObserver = new Subject<number>();
  progress$ = this.progressObserver.asObservable();
  progress: number = 0;

  //atribut for file upload
  filesToUpload: Array<File>;
  idLomba;
  //path request API
  public pathGetPesertaBaru="http://localhost:8000/panitia/daftarPeserta/";

  public pathGetPeserta="http://localhost:8000/panitia/daftarPesertaBaru/";
  public pathGetPesertaTingkatAkhir="http://localhost:8000/panitia/daftarTingkatAkhir/";
  public pathGetPesertaVerified="http://localhost:8000/panitia/daftarPesertaVerified/";

  public pathVerifPeserta="http://localhost:8000/panitia/verifikasi/";
  public pathVerifTingkatAkhir="http://localhost:8000/panitia/verifikasiTingkatAkhir/";
  public pathUnverifPeserta="http://localhost:8000/panitia/unverifikasi/";


  token:string;

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http:Http) {
    this.token = localStorage.getItem('token');
    var user = this.jwtHelper.decodeToken(this.token);
 
  }

  public getPesertaBaru(){

    let header= new Headers();
    header.append('Content-type', 'application/json' );
    header.append('token', this.token );//put token to request API

    console.log(header);

    return this.http.get(this.pathGetPesertaBaru, {headers:header})
      .map((response: Response) =>
        response.json()
      );
  }

  public getAllPesertaTingkatAkhir(){

    let header= new Headers();
    header.append('Content-type', 'application/json' );
    header.append('token', this.token );//put token to request API

    console.log(header);

    return this.http.get(this.pathGetPesertaTingkatAkhir, {headers:header})
      .map((response: Response) =>
        response.json()
      );

  }

  public getAllPeserta(){

    let header= new Headers();
    header.append('Content-type', 'application/json' );
    header.append('token', this.token );//put token to request API

    console.log(header);

    return this.http.get(this.pathGetPeserta, {headers:header})
      .map((response: Response) =>
        response.json()
      );

  }


  public getAllPesertaVerified(){
    let header= new Headers();
    header.append('Content-type', 'application/json' );
    header.append('token', this.token );//put token to request API

    console.log(header);

    return this.http.get(this.pathGetPesertaVerified, {headers:header})
      .map((response: Response) =>
        response.json()
      );

  }


  public verifikasiPeserta(id: number): Observable<any>{
    console.log(id);
    let send = JSON.stringify({id: id});

    let header= new Headers();
    header.append('Content-type', 'application/json' );
    header.append('token', this.token );//put token to request API

    console.log(this.token);
    console.log(header);
    console.log(this.pathVerifPeserta+id);

    return this.http.post(this.pathVerifPeserta+id, send, {headers: header})
      .map((response: Response) =>
        response.json()
      );
  }

  public verifikasiTingkatAkhir(id: number): Observable<any>{
    console.log(id);
    let send = JSON.stringify({id: id});

    let header= new Headers();
    header.append('Content-type', 'application/json' );
    header.append('token', this.token );//put token to request API

    console.log(this.token);
    console.log(header);
    console.log(this.pathVerifTingkatAkhir+id);

    return this.http.post(this.pathVerifTingkatAkhir+id, send, {headers: header})
      .map((response: Response) =>
        response.json()
      );
  }

  public unVerifikasiPeserta(id: number): Observable<any>{
    console.log(id);
    let send = JSON.stringify({id: id});

    let header= new Headers();
    header.append('Content-type', 'application/json' );
    header.append('token', this.token );//put token to request API

    console.log(this.token);
    console.log(header);
    console.log(this.pathUnverifPeserta+id);

    return this.http.post(this.pathUnverifPeserta+id, send, {headers: header})
      .map((response: Response) =>
        response.json()
      );
  }

}
