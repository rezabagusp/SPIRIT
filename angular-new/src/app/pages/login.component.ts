import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Rx';

import { ToastrService } from 'toastr-ng2';
import { PanitiaService } from '../services/panitia.service';

import 'rxjs/add/operator/map';

import { Lightbox } from 'angular2-lightbox';

@Component({
  templateUrl: 'login.component.html',
  providers: [PanitiaService]
})
export class LoginComponent implements OnInit {

  photos = [];
  dtOptions: DataTables.Settings = {};
  participants = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();

  public errorMessage: string;

  constructor(
    private http: Http,
    private panitiaService: PanitiaService,
    private _lightbox: Lightbox ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      retrieve: true
    };
    this.initPeserta();
 
  }

  private initPeserta(){//UNTUK GET LIST PESERTA YANG BELUM DAFTAR
    this.panitiaService.getAllPesertaTingkatAkhir()
    .subscribe(
      data=> {
<<<<<<< HEAD
        // pengolahan id yang sama
        let tempId = data[0].mahasiswa.id;
        let lombas = [];
        let i = 0;
        let j = 0;
        let k = 0;
        for(let list of data)
        {
          if(tempId != list.mahasiswa.id) {
            data[j-1].lombas = lombas;
            this.participants[k] = data[j-1];
            k++;
            tempId = list.mahasiswa.id;
            lombas = [];
            i = 0;
            lombas[0] = list.lomba.nama_lomba;
            i++;
          } else {
            lombas[i] = list.lomba.nama_lomba;
            i++;
          }
          j++;
          console.log('looping loh',list);
        }
        data[j-1].lombas = lombas;
        this.participants[k] = data[j-1];

        // end of pengolahan id yang sama

        // this.participants = data;
=======
        this.participants = data;
>>>>>>> e9e4045bcaf986a40c8f67e235f62d30f3d65c02
        console.log('ini list peserta ', this.participants);
        console.log('ini panjangnyaa', this.participants.toString().length);
        this.dtTrigger.next();

        // untuk foto lightbox
        for(let participant of this.participants){
          participant.album = [
            {
              "src": `/src/img/${participant.photoKTM_peserta}`,
              "caption": 'Foto KTM'
            },
            {
              "src": `/src/img/${participant.photodiri_peserta}`,
              "caption": "Foto Peserta"
            }
          ]
        }
      }

  
    );

  }

  public verifikasi(id:number){
    let result;
    swal({
      title: 'Are you sure?',
<<<<<<< HEAD
      text: "This data will be updated to verified status!",
=======
      text: "You want to update this data!",
>>>>>>> e9e4045bcaf986a40c8f67e235f62d30f3d65c02
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
<<<<<<< HEAD
      confirmButtonText: 'Yes, verifiy it!'
=======
      confirmButtonText: 'Yes, update it!'
>>>>>>> e9e4045bcaf986a40c8f67e235f62d30f3d65c02
    }).then( () => {
      this.panitiaService.verifikasiPeserta(id)
      .subscribe(
        data=> {
          if(data == 1){
            swal(
              'Updated!',
              'Your data has been updated.',
              'success'
            )
<<<<<<< HEAD
            this.participants = [];
=======
>>>>>>> e9e4045bcaf986a40c8f67e235f62d30f3d65c02
            this.ngOnInit();
          }
          //location.reload();
          result = data;
          console.log(result);
        },
        error => {
          console.log(error);
          throw error;
        }
      );
    })
  }

  public openPhoto(photo, index:number):void{
    console.log("open photo");
    console.log(photo);
    console.log(this.photos);

    this._lightbox.open(photo, index);
  }

}
