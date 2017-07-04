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
        this.participants = data;
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
      text: "You want to update this data!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
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
