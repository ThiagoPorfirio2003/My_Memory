import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { SharedComponentsModule } from 'src/app/core/sharedComponents/shared-components.module';
import { MenuModule } from '../menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    SharedComponentsModule,
    MenuModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
