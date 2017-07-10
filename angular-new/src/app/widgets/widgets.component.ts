import { Component } from '@angular/core';

@Component({
  templateUrl: 'widgets.component.html'
})
export class WidgetsComponent {
  settings = {
    columns: {
      nim: {
        title: 'NIM'
      },
      nama: {
        title: 'Nama Kontingen'
      },
      jenis_lomba: {
        title: 'Jenis Lomba'
      },
      Foto: {
        title: 'Foto'
      }
    }
  };
}
