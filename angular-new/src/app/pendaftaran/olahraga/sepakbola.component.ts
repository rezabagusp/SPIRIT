import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';
import { Kontingen } from '../kontingen.interface';
//services pj
import { PenanggungjawabService } from '../../services/penanggungjawab.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
//s
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
//Lighbox library
import { Lightbox } from 'angular2-lightbox';

@Component({
  templateUrl: 'sepakbola.component.html',
  styleUrls: ['./sepakbola.component.css'],
  providers: [PenanggungjawabService]
})
export class SepakBolaComponent  {

  public myForm: FormGroup;
  public isFieldDisabled: boolean[]= [];
  //array buat nyimpen file
  filesToUpload: Array<File>;
  listPeserta;
  idOlahraga;

  public fileValid : boolean = false;
  private submitted: boolean = false;
  private uploadProgress: number = 0;


  constructor(private _fb: FormBuilder, 
    private penanggungjawabservice: PenanggungjawabService, 
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _lightbox: Lightbox) { 
    this.filesToUpload = [];
    this.listPeserta=[];
    this.penanggungjawabservice.progress$.subscribe(status => {
      this.uploadProgress = status;
    })

    this.activatedRoute.params.subscribe((params: Params)=>{
      let componenId = params['id'];
      this.idOlahraga = params['id'];
      console.log(componenId);
      console.log("caccat bagnegettete")
    })
    console.log(this.activatedRoute)
  }

  ngOnInit(){
    this.initPeserta();
    this.initForm();

  }
  initForm(){
    this.myForm = this._fb.group({
      nama: ['', Validators.required],
      nim: ['',[Validators.required, Validators.minLength(9)]],
      noHp: ['', [Validators.required,Validators.minLength(10)]]
    })
    this.filesToUpload=[];
    console.log('restore lagi', this.filesToUpload )
  }
  


  initPeserta(){//UNTUK GET LIST PESERTA YANG SUDAH DAFTAR
    console.log("minta get all peserta . . .")
    this.penanggungjawabservice.getAllPeserta(this.idOlahraga)
    .subscribe(
      data=> {
        this.listPeserta = data;
        for (let x in this.listPeserta )
           this.listPeserta[x].album = [{"src":"http://localhost:4200/src/img/"+this.listPeserta[x].photoKTM_peserta,"caption": "Photo KTM"}, {"src":"http://localhost:4200/src/img/"+this.listPeserta[x].photodiri_peserta, "caption": "Photo"} ]
        console.log('ini list peserta ', this.listPeserta);
        console.log('ini panjangnyaa', this.listPeserta.toString().length);
     }

    );
  }
  

  //when choose file put to array
  fileChangeEvent(fileInput: any){

    this.filesToUpload = <Array<File>> fileInput.target.files;
    if(this.filesToUpload.length==2 && this.myForm.valid){
      this.fileValid=true;
    }
    else this.fileValid=false;

    console.log('status file valid ' + this.fileValid);
    console.log('jumlah file' + this.filesToUpload.length);
  }

  submit(model: Kontingen) {
    this.submitted = true;//for activate progress bar 
    let token = this.penanggungjawabservice.token;
    console.log('ini yangg mau di KIRIM DATANYA', this.myForm.value.nama);
    this.penanggungjawabservice.makeFileRequest("http://localhost:8000/pj/daftarPeserta", token , this.idOlahraga, this.filesToUpload, this.myForm.value.nama,this.myForm.value.nim,this.myForm.value.noHp )
      .then((result) => {
        console.log('balikannya ', result);
        if(result=="1"){
          this.toastrService.warning('Data mahasiswa tidak ditemukan!', 'Warning!');  
        }
        else if (result==2){
          this.toastrService.error('Mahasiswa sudah mengikuti lebih 5 keikutsertaan', 'Failed');  
        }
        else if (result==3){
          this.toastrService.error('Mahasiswa sudah terdaftar pada lomba', 'Failed');
        }
        else{
          console.log('iki balikan submit',result);
          this.toastrService.success('Menambah peserta berhasil!', 'Success!');
          this.ngOnInit();
        }

      }, (error) => {
        console.error(error);
        //this.toastrService.error('Error!', 'Something Wrong!');
          if(error==="invalidToken"){
           swal(
              'Failed',
              'Session anda telah habis',
              'info'
          )
           console.log(error);

           this.router.navigate(['login']);
         }
         if(error==="gagalUpload"){
           this.toastrService.error('internal server error', 'error');           
         }

      });
  }


  delete(nim){
    console.log('masuk delete');
    swal({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false
    }).then(function () {
    swal(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
    }, function (dismiss) {
    // dismiss can be 'cancel', 'overlay',
    // 'close', and 'timer'
    if (dismiss === 'cancel') {
      swal(
        'Cancelled',
        '',
        'error'
      )
    }
    })
  }

  cek(){
    this.ngOnInit();
  }

  //test jwt for encode status
  jwtHelper: JwtHelper = new JwtHelper();

  test(){
    console.log('udah ke tosat');
    this.toastrService.success('Hello world!', 'Toastr fun!');

      var token = localStorage.getItem('token');
    //testing jwt helper 
    console.log(
      this.jwtHelper.decodeToken(token),
      this.jwtHelper.getTokenExpirationDate(token),
      this.jwtHelper.isTokenExpired(token)
    );
    console.log('id olahraganya ',  this.idOlahraga);

  }

  pot=[]
  openHAHA(pot,index: number): void {
    console.log("masuk open ")
    console.log(pot)

    console.log(this.pot);  
        
    // open lightbox
    this._lightbox.open(pot, index);
  }
}
