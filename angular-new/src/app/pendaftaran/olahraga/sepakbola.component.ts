import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
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

export class SepakBolaComponent implements OnInit  {
  public myForm: FormGroup;
  public myFormUpdate: FormGroup;  
  public isFieldDisabled: boolean[]= [];
  //array buat nyimpen file
  filesToUpload: Array<File>;
  listPeserta;
  idOlahraga;
  checkingNim:boolean;
  // public myModal:ModalDirective
  //array form
  nama;
  nim;
  noHp;
  fileValid : boolean;
  
  status: boolean;  
  namaUpdate;
  nimUpdate;
  noHpUpdate;
  fileValidUpdate : boolean;


  public albumReja=[];
  coba="/src/img/images/coba0.jpg"
  

  public submitted: boolean = false;
  public uploadProgress: number = 0;


  constructor(private _fb: FormBuilder, 
    private penanggungjawabservice: PenanggungjawabService, 
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _lightbox: Lightbox,
    private cd: ChangeDetectorRef
    ) { 
    this.listPeserta=[];
    this.fileValid=false;
    this.fileValidUpdate=false;
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
    this.checkingNim=null;
    this.status=null;
    this.filesToUpload = [];
    this.nama='';
    this.nim='G64140034';
    this.noHp='';
    this.fileValid=false;


    this.myForm = this._fb.group({
      nama: [this.nama,[Validators.required]],
      nim: [this.nim,[Validators.required, Validators.minLength(9)]],
      noHp: [this.noHp, [Validators.required,Validators.minLength(10)]]
    })
    
    this.namaUpdate='';
    this.nimUpdate='';
    this.noHpUpdate='';

    this.myFormUpdate = this._fb.group({
      namaUpdate: [this.namaUpdate,[]],
      nimUpdate: [this.nimUpdate,[]],
      noHpUpdate: [this.noHpUpdate, [Validators.required,Validators.minLength(10)]]
    })

    console.log("value after re init", this.myForm.value)
    console.log('restore lagi file upload', this.filesToUpload )
  }
  


  initPeserta(){//UNTUK GET LIST PESERTA YANG SUDAH DAFTAR
    console.log("minta get all peserta . . .")
    this.penanggungjawabservice.getAllPeserta(this.idOlahraga)
    .subscribe(
      data=> {
        this.listPeserta = data;
        for (let x in this.listPeserta )
           this.listPeserta[x].album = [{"src":"assets/img/background.jpg","caption": "Photo KTM"}, {"src":"assets/img/background.jpg", "caption": "Photo"} ]
        console.log('ini list peserta ', this.listPeserta);
        console.log('ini panjangnyaa', this.listPeserta.toString().length);
     }

    );
      this.albumReja=[{
        "src":"",
        "caption":"photo"
      },
      {
        "src":"",
        "caption":"photo KTM"
      }]
  }
  
  checkNim(nim){
    console.log("nim yang masu di chek:", nim);
    this.penanggungjawabservice.checkNim(nim)
    .subscribe(
      data=> {
        console.log("status check nim: ", data.status);
        this.checkingNim=data.status;
        //untuk flag udah daftar atau belum di submit
        this.status=data.status;
        if(this.checkingNim!=null){
          if(this.checkingNim){

            this.myForm.get('noHp').setValue(data.noHP_peserta);
            this.myForm.get('nama').setValue(data.mahasiswa.nama_mahasiswa);
            this.myForm.get('nim').setValue(data.mahasiswa.NIM_mahasiswa);          

            this.myForm.get('nama').disable();
            this.myForm.get('nim').disable();
            this.myForm.get('noHp').disable();  

            this.albumReja[0].src=data.photodiri_peserta;
            this.albumReja[1].src=data.photoKTM_peserta;      
            console.log("isi form after check: ", this.myForm.value)            
          }
          //masuk kondisi salah
          if(!this.checkingNim){
            console.log("datanya :", data)
            console.log(data.nama_mahasiswa)
            console.log(data.NIM_mahasiswa)            
            

            this.myForm.get('nama').setValue(data.nama_mahasiswa);
            this.myForm.get('nim').setValue(data.NIM_mahasiswa);            
            console.log("isi form after check: 111 ", this.myForm.value)

            console.log("value nim after check: ", this.myForm)
            this.myForm.get('nama').disable();  
            this.myForm.get('nim').disable();
          }

        }
        else{
          console.log("masuk nul njay")
          this.toastrService.warning('Data mahasiswa tidak ditemukan!', 'Warning!');           
        }        

        console.log("status cheknim", this.checkingNim);
        console.log("isi album", this.albumReja);

     }

    );

  }

  //when choose file put to array
  fileChangeEvent(fileInput: any, tipe){
    this.filesToUpload = []

    this.filesToUpload = <Array<File>> fileInput.target.files;
    
    if(tipe==1){//untuk state file daftar peserta
      if(this.filesToUpload.length==2 && this.myForm.valid){
          this.fileValid=true;
      }
      else this.fileValid=false;
      console.log('status file valid ' + this.fileValid);      
    }
    if(tipe==2){//untuk state file update
      console.log("masuk kondisi file update")
      if(this.filesToUpload.length==2 && this.myFormUpdate.valid){
          this.fileValidUpdate=true;
      }
      else this.fileValidUpdate=false;  
      console.log('status file valid update ' + this.fileValidUpdate);
    }

    console.log('jumlah file' + this.filesToUpload.length);
  }

  submit(model: Kontingen) {
    //set inut form all to enable to get the data
    this.myForm.get('nama').enable();  
    this.myForm.get('nim').enable();
    this.myForm.get('noHp').enable();

    this.submitted = true;//for activate progress bar 
    
    let token = this.penanggungjawabservice.token;
    console.log('ini yangg mau di KIRIM DATANYA', this.myForm.value);
    this.penanggungjawabservice.makeFileRequest(this.idOlahraga, this.filesToUpload, this.myForm.value.nama,this.myForm.value.nim,this.myForm.value.noHp, this.status )
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
        else if (result=="BERHASIL"){
          console.log('iki balikan submit',result);
          this.toastrService.success('Menambah peserta berhasil!', 'Success!');
          this.refreshForm();
        }
        else{
          console.log('iki balikan submit',result);
          this.toastrService.error('hanya tipe file jpeg yang diizinkan!', 'Failed!');
          this.refreshForm();
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

  deleteConfirm(){
    return swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })  
    }

  refreshForm(){
      console.log("masuk refresh form ")
      this.myForm.get('nim').enable();
      this.ngOnInit();
  }

  deletePeserta(idPeserta){
    this.deleteConfirm().then(res => {
      this.penanggungjawabservice.deletePeserta(idPeserta)
        .subscribe(data =>{
          if(data.status){
            swal(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.ngOnInit();     
          }else{
            console.log(data);
          }
        })
    }).catch(err => {
            swal(
              'failed!',
              'Something wrong',
              'failed'
            )

    })
    
  }

  updatePeserta(peserta){
    let token = this.penanggungjawabservice.token;
    this.myFormUpdate.get('namaUpdate').setValue(peserta.mahasiswa.nama_mahasiswa);
    this.myFormUpdate.get('nimUpdate').setValue(peserta.mahasiswa.NIM_mahasiswa);
    this.myFormUpdate.get('noHpUpdate').setValue(this.myFormUpdate.value.noHpUpdate);

    console.log("ini pesertanya : ", peserta);
    console.log('ini yangg mau di KIRIM DATA UPDATE', this.myFormUpdate.value);
    this.penanggungjawabservice.updatePeserta(this.filesToUpload, this.myFormUpdate.value.namaUpdate,this.myFormUpdate.value.nimUpdate,this.myFormUpdate.value.noHpUpdate, peserta.id )
      .then((result) => {
        console.log('balikannya ', result);
          if(result==="BERHASIL"){
            swal(
              'Update!',
              'Your file has been update.',
              'success'
            )
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
    console.log("update informasi mahasiwswa : ", this.myFormUpdate.value);

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

  openHAHA(pot,index: number): void {
    console.log("masuk open ")
    console.log(pot)  
        
    // open lightbox
    this._lightbox.open(pot, index);
  }


}

