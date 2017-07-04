import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Rx';

import { ToastrService } from 'toastr-ng2';
import { PanitiaService } from '../services/panitia.service';

import { Lightbox } from 'angular2-lightbox';

import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'register.component.html',
  providers: [PanitiaService]
})
export class RegisterComponent {

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
    private _lightbox: Lightbox) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      retrieve: true
    };

    this.initPeserta();
  }

  private initPeserta(){//UNTUK GET LIST PESERTA YANG SUDAH DAFTAR
    this.panitiaService.getAllPesertaVerified()
    .subscribe(
      data=> {
        this.participants = data;
        console.log('ini list peserta ', this.participants);
        console.log('ini panjangnyaa', this.participants.toString().length);
        this.dtTrigger.next();

        // untuk foto lightbox
        for(let participant of this.participants){
          participant.album = [
            {
              "src": `http://localhost:4200/src/img/${participant.photoKTM_peserta}`,
              "caption": 'Foto KTM'
            },
            {
              "src": `http://localhost:4200/src/img/${participant.photodiri_peserta}`,
              "caption": "Foto Peserta"
            }
          ]
        }
     }
    );
  }

  public unverifikasi(id:number){

    let result;
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then( () => {
      this.panitiaService.unVerifikasiPeserta(id)
      .subscribe(
        data=> {
          console.log("ini datanya")
          console.log(data)
          if(data == 1){
            swal(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            )
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
