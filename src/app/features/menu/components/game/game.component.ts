import { Component, Input, Output, OnChanges, OnInit, SimpleChanges, EventEmitter } from '@angular/core';
import { MyGame } from 'src/app/core/classes/game';
import { enumAnimal, enumFruit, enumTool } from 'src/app/core/enums/cardType';
import { enumDifficulties } from 'src/app/core/enums/difficulties';
import { enumGameState } from 'src/app/core/enums/game';
import { MyCard } from 'src/app/core/models/card.model';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnChanges
{
  @Input() diffilcutyChosen! : enumDifficulties;
  @Input() componentIsVisible! : boolean;
  @Output() showMenuEventEmitter : EventEmitter<boolean>;

  public showAllImgs : boolean;
  public game! : MyGame;
  public buttonsChosenId : Array<HTMLButtonElement>; 
  public canClic : boolean;
  private readonly BTN_BASE_CLASS_NAME : string = 'card sf ios button button-solid ion-activatable ion-focusable hydrated'
  private cardsSelected : Array<MyCard>;

  constructor(private utilsService : UtilsService) 
  { 
    this.showMenuEventEmitter = new EventEmitter<boolean>();
    this.buttonsChosenId = new Array<HTMLButtonElement>();
    this.canClic = true;
    this.cardsSelected = new Array<MyCard>();
    this.showAllImgs = true;
  }

  ngOnChanges(changes : SimpleChanges) : void 
  {
    if(changes['componentIsVisible'].currentValue == true)
    {
      this.game = MyGame.getGame(this.diffilcutyChosen);

      setTimeout(()=>
      {
        this.showAllImgs = false;
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
      this.utilsService.showSweet({title:'Juego terminado', text: '¡¡¡Tan solo fueron X segundos!!!', background:'#024050',
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
          this.showMenuEventEmitter.emit(false)
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
