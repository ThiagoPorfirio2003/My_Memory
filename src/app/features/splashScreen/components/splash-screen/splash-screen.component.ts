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
  public h1Text : string;
  public h2Text : string;

  public h1AnimationClass : string;
  public h2AnimationClass : string;

  constructor(private utilsService : UtilsService,
    private platform : Platform)
    {
      this.h1Text = 'Thiago Porfirio';
      this.h2Text = '4to A';

      this.h1AnimationClass = 'tracking-out-expand-fwd-top';
      this.h2AnimationClass = 'tracking-out-expand-fwd-bottom'
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
            this.h1Text = '4to A';
            this.h2Text = 'Thiago Porfirio';
      
            this.h1AnimationClass = 'tracking-in-contract-bck-top';
            this.h2AnimationClass = 'tracking-in-contract-bck-bottom'          
          },2000)

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
