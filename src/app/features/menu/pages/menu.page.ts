import { Component, OnInit } from '@angular/core';
import { classDifficuelties, enumDifficulties } from 'src/app/core/enums/difficulties';
import { MyResult } from 'src/app/core/models/result.model';
import { gameResult } from 'src/app/core/models/user.model';
import { AuthService } from '../../auth/services/auth.service';
import { DatabaseService } from '../../data/database.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { NameCollections } from 'src/app/core/enums/collectionNames';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage //implements OnInit
{

  public difficultyChosen : enumDifficulties
  public showMenu : boolean;
  //public bestPlayers! : Array<gameResult>;
  public showGame : boolean;

  public difficultyNameColor! : string;

  public topResults : Array<MyResult>;

  constructor(private authService : AuthService,
  private dataBaseService : DatabaseService,
  private utilsService : UtilsService) 
  {
    this.showGame = false;
    this.difficultyChosen = 1;
    this.showMenu = true;
    this.topResults = new Array<MyResult>();
  }

  /*
  ngOnInit(): void 
  {
    this.bestPlayers = [
      {seconds: 50, playerName: 'adm_Natalia', uidPlayer: 'jkfad', id: 'fds', difficulty: enumDifficulties.EASY},
      {seconds: 100, playerName: 'inv_Martina', uidPlayer: 'jkfad', id: 'fds', difficulty: enumDifficulties.NORMAL},
      {seconds: 150, playerName: 'test_Cecilia', uidPlayer: 'jkfad', id: 'fds', difficulty: enumDifficulties.HARD},
      {seconds: 250, playerName: 'Nadie', uidPlayer: 'jkfad', id: 'fds', difficulty: enumDifficulties.HARD},
      {seconds: 300, playerName: 'user_Esteban', uidPlayer: 'jkfad', id: 'fds', difficulty: enumDifficulties.NORMAL},
    ] 
  }
  */

  public choseDifficulty(choose : enumDifficulties)
  {
    let collectionName : NameCollections;
    
    switch(choose)
    {
      case enumDifficulties.EASY:
        collectionName = NameCollections.EASY_GAME;
        this.difficultyNameColor = 'success';
        break;

      case enumDifficulties.NORMAL:
        collectionName = NameCollections.NORMAL_GAME;
        this.difficultyNameColor = 'warning';
        break;

      case enumDifficulties.HARD:
        collectionName = NameCollections.HARD_GAME;
        this.difficultyNameColor = 'danger';
        break;
    }

    if(choose != this.difficultyChosen || this.topResults.length == 0)
    {
      this.topResults = [];

      this.dataBaseService.getResultOrdered(collectionName)
      .then((results)=>
      {
        results.forEach((doc)=>
        {
          this.topResults.push(doc.data() as MyResult);
        })
      })
    }

    this.difficultyChosen = choose;
    this.showMenu = false;
    this.showGame = false;
  }

  public play()
  {
    this.showGame = true;
  }

  public changeShowMenu(show : boolean)
  {
    this.showMenu = show;
    this.showGame = false;
  }

  public transaleDifficulties(value : enumDifficulties)
  {
    return classDifficuelties.toWord(value);
  }

  public async saveGameResult(result : MyResult)
  {
    const loading = await this.utilsService.getLoadingCtrl({spinner: 'circles'});
    
    await loading.present();

    this.changeShowMenu(true);

    result.playerName = this.authService.myUser.userName;
    result.playerUID = this.authService.myUser.uid;


    loading.present();
    this.dataBaseService.saveGameResult(result, this.difficultyChosen)
    .then(()=>
      {
        loading.dismiss();
        this.topResults = [];
        this.utilsService.showSweet(
          {title: 'Partida guardada', text: 'Si fuiste muy rápido  es probable que salgas en el listado de mejores', position: 'bottom', timer: 3000,
          showConfirmButton: false, customClass: 'toast', toast: true, timerProgressBar: true, background: '#FDF0D5'})
      })
    .finally(()=> 
    {
      if(loading.isOpen)
      {
        loading.dismiss();
      }
    })
  }
}
