import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams} from '@angular/http';//add http module
import { Subject } from 'rxjs/Subject';
//helper to decode jwt coy
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class PenanggungjawabService {
	
	//atribut for loading bar upload
  progressObserver = new Subject<number>();
  progress$ = this.progressObserver.asObservable();
	progress: number = 0;
	
	//atribut for file upload
  filesToUpload: Array<File>;
  idDepartemen;
  idLomba;
  //path request API
  pathGetPeserta="http://localhost:8000/pj/listpeserta/";
  token:string;

  jwtHelper: JwtHelper = new JwtHelper();
  
  constructor(private http:Http) {
  	this.token = localStorage.getItem('token');
  	var user = this.jwtHelper.decodeToken(this.token);
  	this.idDepartemen = user.fk_departementId;
  	console.log('Id department ',  this.idDepartemen);
  }

  getAllPeserta(idOlahraga:number){
  	console.log('idDep ', this.idDepartemen);
	let header= new Headers();
    header.append('Content-type', 'application/json' );
		header.append('token', this.token );//put token to request API


    return this.http.get(this.pathGetPeserta+this.idDepartemen+"/"+idOlahraga, {headers:header})
        .map((response: Response) => 
	        	response.json()
        )
                
  }

	makeFileRequest(url: string, token: any, idOlahraga:number, files: Array<File>, nama:string, nim:string, noHp:string) {
		return new Promise((resolve, reject) => {
			var formData: any = new FormData();
			var xhr = new XMLHttpRequest();
			for(var i = 0; i < files.length; i++) {
				formData.append("uploads[]" ,files[i],files[i].name);
			}
			//append informasi lain peserta.
			formData.append("namaMahasiswa", nama);
			formData.append("nimMahasiswa", nim);
			formData.append("noHp", noHp);				
			formData.append("idLomba", idOlahraga);

			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						resolve(JSON.parse(xhr.response));
					} else {
						reject(xhr.response);
					}
				}
			}
			setInterval(() => {}, 500);

			xhr.upload.onprogress = (event) => {
    			this.progress = Math.round(event.loaded / event.total * 100);
    			this.progressObserver.next(this.progress);
			};

			console.log('ini yang dikirim ', files);
			console.log('ini form data, harusnya keluar IdLomba', formData.getAll('idLomba') );
			console.log('ini files.name', files[0]);

			xhr.open("POST", url, true);
			xhr.setRequestHeader('token', token);//put token to API
			xhr.send(formData);
		});
	}
}