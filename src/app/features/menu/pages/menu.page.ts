import { Component, OnInit } from '@angular/core';
import { classDifficuelties, enumDifficulties } from 'src/app/core/enums/difficulties';
import { gameResult } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit{

  public difficultyChosen : enumDifficulties
  public showMenu : boolean;
  public bestPlayers! : Array<gameResult>;
  public showGame : boolean;

  public difficultyNameColor! : string;

  constructor() 
  {
    this.showGame = false;
    this.difficultyChosen = 1;
    this.showMenu = true;
  }

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

  public choseDifficulty(choose : enumDifficulties)
  {
    switch(choose)
    {
      case enumDifficulties.EASY:
        this.difficultyNameColor = 'success';
        break;

      case enumDifficulties.NORMAL:
        this.difficultyNameColor = 'warning';
        break;

      case enumDifficulties.HARD:
        this.difficultyNameColor = 'danger';
        break;
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
}
