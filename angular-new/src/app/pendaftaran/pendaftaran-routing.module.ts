import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ButtonsComponent } from './buttons.component';
import { CardsComponent } from './cards.component';
import { FormsComponent } from './forms.component';
import { ModalsComponent } from './modals.component';
import { SocialButtonsComponent } from './social-buttons.component';
import { SwitchesComponent } from './switches.component';
import { TablesComponent } from './tables.component';
import { TabsComponent } from './tabs.component';

//olahraga component
import { SepakBolaComponent } from './olahraga/sepakbola.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: ''
    },
    children: [
      {
        path: 'olahraga/sepakbola/:id',
        component: SepakBolaComponent,
        data: {
          title: 'Sepakbola'
        } 
      },
      {
        path: 'olahraga/basket/:id',
        component: SepakBolaComponent,
        data: {
          title: 'Basket'
        } 
      },
      {
        path: 'olahraga/voli/:id',
        component: SepakBolaComponent,
        data: {
          title: 'Voli'
        } 
      },
      {
        path: 'olahraga/badminton/:id',
        component: SepakBolaComponent,
        data: {
          title: 'Badminton'
        } 
      },

      //SENI
      {
        path: 'seni/vocalgroup/:id',
        component: SepakBolaComponent,
        data: {
          title: 'Vocal Group'
        } 
      },    
      {
        path: 'buttons',
        component: ButtonsComponent,
        data: {
          title: 'Buttons'
        }
      },
      {
        path: 'cards',
        component: CardsComponent,
        data: {
          title: 'Cards'
        }
      },
      {
        path: 'forms',
        component: FormsComponent,
        data: {
          title: 'Forms'
        }
      },
      {
        path: 'modals',
        component: ModalsComponent,
        data: {
          title: 'Modals'
        }
      },
      {
        path: 'social-buttons',
        component: SocialButtonsComponent,
        data: {
          title: 'Social buttons'
        }
      },
      {
        path: 'switches',
        component: SwitchesComponent,
        data: {
          title: 'Switches'
        }
      },
      {
        path: 'tables',
        component: TablesComponent,
        data: {
          title: 'Tables'
        }
      },
      {
        path: 'tabs',
        component: TabsComponent,
        data: {
          title: 'Tabs'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendaftaranRoutingModule {}
