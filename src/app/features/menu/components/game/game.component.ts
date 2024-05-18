import { Component, Input, Output, OnChanges, OnInit, SimpleChanges, EventEmitter } from '@angular/core';
import { MyGame } from 'src/app/core/classes/game';
import { enumAnimal, enumFruit, enumTool } from 'src/app/core/enums/cardType';
import { enumDifficulties } from 'src/app/core/enums/difficulties';
import { enumGameState } from 'src/app/core/enums/game';
import { MyCard } from 'src/app/core/models/card.model';
import { MyResult } from 'src/app/core/models/result.model';
import { UtilsService } from 'src/app/core/services/utils.service';
import { DatabaseService } from 'src/app/features/data/database.service';
import { Timer, Time, TimerOptions } from 'timer-node';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnChanges
{
  @Input() diffilcutyChosen! : enumDifficulties;
  @Input() showGame! : boolean;
  @Output() saveGameResult : EventEmitter<MyResult>;

  public color! : string;
  public showAllImgs : boolean;
  public game! : MyGame;
  public buttonsChosenId : Array<HTMLButtonElement>; 
  public canClic : boolean;
  private BTN_BASE_CLASS_NAME : string = 'card sf ios button button-solid ion-activatable ion-focusable hydrated'
  private cardsSelected : Array<MyCard>;
  private timer : Timer;

  constructor(private utilsService : UtilsService) 
  { 
    this.saveGameResult = new EventEmitter<MyResult>();
    this.buttonsChosenId = new Array<HTMLButtonElement>();
    this.canClic = true;
    this.cardsSelected = new Array<MyCard>();
    this.showAllImgs = true;

    this.timer = new Timer({label: 'Game duration'});
  }

  ngOnChanges(changes : SimpleChanges) : void 
  {
    if(changes['showGame'].currentValue == true)
    {
      switch(this.diffilcutyChosen)
      {
        case enumDifficulties.EASY:
          this.BTN_BASE_CLASS_NAME+= ' ion-color ion-color-success';
          this.color = 'success'
          break;

        case enumDifficulties.NORMAL:
          this.color = 'warning';
          this.BTN_BASE_CLASS_NAME+= ' ion-color ion-color-warning';
          break;

        case enumDifficulties.HARD:
          this.color = 'danger';
          this.BTN_BASE_CLASS_NAME+= ' ion-color ion-color-danger';
          break;

      }

      this.game = MyGame.getGame(this.diffilcutyChosen);

      setTimeout(()=>
      {
        this.showAllImgs = false;
        this.timer.start();
      },1500)
    }
  }

  public selectCard(card : MyCard,idButton : string)
  { 
    this.buttonsChosenId.push((<HTMLButtonElement>document.getElementById(idButton)));
    this.cardsSelected.push(card);
    card.showImg = true;


    this.changeBtnsCSS(this.game.selectCard(card))

    if(this.game.state == enumGameState.FINISHED)
    {
      this.timer.pause();
      
      const miliseconds : number = this.timer.ms();

      this.timer.clear();

      this.utilsService.showSweet({title:'Juego terminado', text: `¡¡¡Tan solo fueron ${miliseconds /1000} segundos!!!`, background:'#024050',
      confirmButtonText: 'Volver', confirmButtonColor: '#0B4C41', allowOutsideClick: false,
      customClass: {
        title: 'sweetTitle',
        confirmButton: 'sweetConfirm',
        popup: 'sweetTitle'
      }})
      .then((result)=>
      {
        if(result.isConfirmed)
        {
          this.saveGameResult.emit({
            playerUID: '',
            playerName: '',
            gameDurationMs: miliseconds,
            gameDifficulty: this.diffilcutyChosen,
            UID: ''
          })
        }
      })
    }
  }

  private changeBtnsCSS(cardsAreEqual : boolean | undefined)
  {
    if(cardsAreEqual != undefined)
      {
        if(cardsAreEqual)
        {
          this.buttonsChosenId.forEach(btn => {
            btn.className+= ' correct' ;
          });

          
          this.cardsSelected.splice(0,2)
          this.buttonsChosenId.splice(0,2)
        }
        else
        {
          this.canClic = false;

          this.buttonsChosenId.forEach(btn => {
            btn.className+= ' incorrect' ;
          });
  
  
          setTimeout(()=>
          {
            for(let i : number = 0;i<2;i++)
            {
              this.buttonsChosenId[i].className = this.BTN_BASE_CLASS_NAME;
              this.cardsSelected[i].showImg = false;
            }
            
            this.cardsSelected.splice(0,2)
            this.buttonsChosenId.splice(0,2)
            this.canClic = true;
          }, 1500)
        }
      }
      else
      {
        this.buttonsChosenId[0].className += ' wait';
      } 
  } 
}
