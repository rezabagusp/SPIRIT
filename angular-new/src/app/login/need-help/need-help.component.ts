import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-need-help',
  templateUrl: './need-help.component.html',
  styleUrls: ['./need-help.component.scss']
})
export class NeedHelpComponent implements OnInit {
  public emailForm: FormGroup;

  constructor(private _fb:FormBuilder) { }

  ngOnInit() {
    this.emailForm = this._fb.group({
      username: ['', Validators.required],
      judul: ['', Validators.required],
      pesan: ['', Validators.required]
    })
  }

  onSubmit(){
    let send = this.emailForm.value;
    console.log(send);
  }

}
