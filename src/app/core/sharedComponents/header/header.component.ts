import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { UtilsService } from '../../services/utils.service';
import { logOut } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent
{
  @Input() title! : string
  
  constructor(public authService : AuthService, private utilsService : UtilsService) 
  {
    addIcons({logOut})
  }

  public signOut()
  {
    this.utilsService.showSweet({title:'¿Seguro que desea salír?', background:'#024050',
    showDenyButton: true, denyButtonText: 'No', denyButtonColor: '#5B175D',
    confirmButtonText: 'Sí', confirmButtonColor: '#0B4C41',
    customClass: {
      title: 'sweetTitle',
      confirmButton: 'sweetConfirm',
      denyButton: 'sweetDeny',
    }})
    .then((result)=>
    {
      if(result.isConfirmed)
      {
        this.authService.logOut();
        this.utilsService.changeRoute('/auth')
      } 
    })
  }
}
