import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { Platform } from '@ionic/angular';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent
{
  public showTxt : boolean;
  public splashScreenClass : string;

  constructor(private utilsService : UtilsService,
    private platform : Platform)
    {
      this.showTxt = false;
      this.splashScreenClass = 'slide-out-right'
    }

    ionViewDidEnter()
    {
      if(!this.utilsService.splashScreenHasShown)
      {
        this.platform.ready().then(() => 
        {
          this.utilsService.splashScreenHasShown = true;

          setTimeout(()=>
          {
            this.showTxt = true;
            this.splashScreenClass = 'slide-in-right'
          },500)

          SplashScreen.hide().then(()=>
          {
            setTimeout(() => 
            {
             // this.utilsService.changeRoute('/auth')
            }, 3000);
          })
        });
      }
    }  
}
