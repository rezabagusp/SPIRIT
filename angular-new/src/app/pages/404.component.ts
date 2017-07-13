 import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Rx';

import { ToastrService } from 'toastr-ng2';

import { PanitiaService } from '../services/panitia.service';


import { Lightbox } from 'angular2-lightbox';

import 'rxjs/add/operator/map';

@Component({
  templateUrl: '404.component.html',
  providers: [PanitiaService]
})
export class P404Component {

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
    private _lightbox: Lightbox
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      retrieve: true
    };

    this.initPeserta();
  }

  private initPeserta(){//UNTUK GET LIST PESERTA YANG SUDAH DAFTAR
    this.panitiaService.getAllPeserta()
    .subscribe(
      data=> {

         // pengolahan id yang sama
        let tempId = data[0].mahasiswa.id
        let lombas = []
        let i = 0
        let j = 0
        let k = 0
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
        console.log('ini list peserta ', this.participants);
        console.log('ini panjangnyaa', this.participants.toString().length);
        this.dtTrigger.next();

        // untuk foto lightbox
        for(let participant of this.participants){
          participant.album = [
            {
              "src": `src/img/${participant.photoKTM__peserta}`,
              "caption": 'Foto KTM'
            },
            {
              "src": `src/img/${participant.photodiri_peserta}`,
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
      text: "This data will be updated to verified status!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, verifiy it!'
    }).then( () => {
      this.panitiaService.verifikasiPeserta(id)
      .subscribe(
        data=> {
          console.log("ini datanya")
          console.log(data)
          if(data.status == 1){
            swal(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.participants = [];
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
