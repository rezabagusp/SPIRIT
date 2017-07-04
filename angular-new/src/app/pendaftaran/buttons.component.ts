import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { Kontingen } from './kontingen.interface';

@Component({
  templateUrl: 'buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent {

  public myForm: FormGroup;
  public isFieldDisabled: boolean[]= [];

  constructor(private _fb: FormBuilder) { }
  ngOnInit(){

    this.myForm = this._fb.group({
      peserta: this._fb.array([])
    })

    //tambahkan nama
    this.addPeserta();
  }

  initPeserta(){
    //inisialiasi nama
    this.isFieldDisabled.pop();
    this.isFieldDisabled.push(false);

    return this._fb.group({
      nama: ['', Validators.required],
      nim: ['', [Validators.required, Validators.minLength(9)]],
      statusShow: ['false']
    })

  }

  addPeserta(){
    //tambahkan nama ke list
    const control = <FormArray>this.myForm.controls['peserta'];
    const addCtrl = this.initPeserta();

    control.push(addCtrl);
  }

  removePeserta(i:number){
    const form= this.myForm;
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      type: "warning",
      showCancelButton: false,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel pls!",
      preConfirm: function() {
       return new Promise(function(resolve) {
         setTimeout(function() {
           resolve();
         }, 2000);
       });
     }
    }).then(function () {
      console.log("ini peserta ke i yang mau di apus ", i);
      const control = <FormArray>form.controls['peserta'];
      control.removeAt(i);
      swal(
        'Deleted!',
        'Kontingen berhasil dihapus.',
        'success'
      )
    },function (dismiss) {
      // dismiss can be 'cancel', 'overlay',
      // 'close', and 'timer'
      if (dismiss === 'cancel') {
        swal(
          'Cancelled',
          'Data kontingen aman tidak dihapus',
          'error'
        )
      }
    })

  }

  onSubmit(model: Kontingen, i:number){

    this.myForm.value.peserta[i].statusShow = true;
    this.isFieldDisabled.push(true);

    let send = this.myForm.value.peserta[i];
    console.log(model);
    console.log('ini isinya', send)
  }
}
