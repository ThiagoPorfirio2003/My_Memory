import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components/game/game.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [GameComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:
  [
    GameComponent
  ]
})
export class MenuModule { }
